import { db } from "@/config/firebase.config";
import { chatSession } from "@/scripts";
import { Interview } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { Loader, Send, Trash2, Undo2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { CustomBreadCrumb } from "./custom-bread-crumb";
import { Headings } from "./headings";
import { Button } from "./ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "./ui/form";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";

interface FormMockInterviewProps {
  initialData: Interview | null;
}

const formSchema = z.object({
  position: z
    .string()
    .min(1, "Position is required")
    .max(100, "Position must be 100 characters or less"),
  description: z.string().min(10, "Description is required"),
  experience: z.coerce
    .number()
    .min(0, "Experience cannot be empty or negative"),
  techStack: z.string().min(1, "Tech stack must be at least a character"),
});

type FormData = z.infer<typeof formSchema>;

export const FormMockInterview = ({ initialData }: FormMockInterviewProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {},
  });

  const { isValid, isSubmitting } = form.formState;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userId } = useAuth();

  const title = initialData
    ? initialData.position
    : "Create a new mock interview";

  const breadCrumpPage = initialData ? initialData?.position : "Create";
  const actions = initialData ? "Save Changes" : "Create";
  const toastMessage = initialData
    ? { title: "Updated..!", description: "Changes saved successfully..." }
    : { title: "Created..!", description: "New Mock Interview created..." };

  const cleanAiResponse = (responseText: string) => {
    // Step 1: Trim any surrounding whitespace
    let cleanText = responseText.trim();

    // Step 2: Remove any occurrences of "json" or code block symbols (``` or `)
    cleanText = cleanText.replace(/(json|```|`)/g, "");

    // Step 3: Extract a JSON array by capturing text between square brackets
    const jsonArrayMatch = cleanText.match(/\[.*\]/s);
    if (jsonArrayMatch) {
      cleanText = jsonArrayMatch[0];
    } else {
      throw new Error("No JSON array found in response");
    }

    // Step 4: Parse the clean JSON text into an array of objects
    try {
      return JSON.parse(cleanText);
    } catch (error) {
      throw new Error("Invalid JSON format: " + (error as Error)?.message);
    }
  };

  const generateAiResponse = async (data: FormData) => {
    const prompt = `
        As an experienced prompt engineer, generate a JSON array containing 5 technical interview questions along with detailed answers based on the following job information. Each object in the array should have the fields "question" and "answer", formatted as follows:

        [
          { "question": "<Question text>", "answer": "<Answer text>" },
          ...
        ]

        Job Information:
        - Job Position: ${data?.position}
        - Job Description: ${data?.description}
        - Years of Experience Required: ${data?.experience}
        - Tech Stacks: ${data?.techStack}

        The questions should assess skills in ${data?.techStack} development and best practices, problem-solving, and experience handling complex requirements. Please format the output strictly as an array of JSON objects without any additional labels, code blocks, or explanations. Return only the JSON array with questions and answers.
        `;

    const aiResult = await chatSession.sendMessage(prompt);
    const cleanedResponse = cleanAiResponse(aiResult.response.text());

    return cleanedResponse;
  };

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      if (initialData) {
        // update
        if (isValid) {
          const aiResult = await generateAiResponse(data);

          await updateDoc(doc(db, "interviews", initialData?.id), {
            questions: aiResult,
            ...data,
            updatedAt: serverTimestamp(),
          }).catch((error) => console.log(error));
          toast(toastMessage.title, { description: toastMessage.description });
        }
      } else {
        // create a new mock interview
        if (isValid) {
          const aiResult = await generateAiResponse(data);

          await addDoc(collection(db, "interviews"), {
            ...data,
            userId,
            questions: aiResult,
            createdAt: serverTimestamp(),
          });

          toast(toastMessage.title, { description: toastMessage.description });
        }
      }

      navigate("/generate", { replace: true });
    } catch (error) {
      console.log(error);
      toast.error("Error..", {
        description: `Something went wrong. Please try again later`,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialData) {
      form.reset({
        position: initialData.position,
        description: initialData.description,
        experience: initialData.experience,
        techStack: initialData.techStack,
      });
    }
  }, [initialData, form]);

  return (
    <div className="w-full flex-col space-y-8 bg-gray-900/90 p-8 rounded-xl shadow-lg backdrop-blur-lg border border-gray-800">
      {/* Breadcrumb */}
      <CustomBreadCrumb
        breadCrumbPage={breadCrumpPage}
        breadCrumpItems={[{ label: "Mock Interviews", link: "/generate" }]}
      />

      {/* Heading & Delete Button */}
      <div className="flex items-center justify-between">
        <Headings title={title} isSubHeading />

        {initialData && (
          <Button
            size="icon"
            variant="ghost"
            className="hover:bg-gray-800/50 transition"
          >
            <Trash2 className="w-5 h-5 text-red-500 hover:text-red-400 transition" />
          </Button>
        )}
      </div>

      <Separator className="border-gray-700 my-4" />

      {/* Form Container */}
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full bg-gray-800/50 p-6 rounded-lg flex flex-col gap-6 shadow-lg border border-gray-700"
        >
          {/* Job Role */}
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-gray-300 font-medium">
                  Job Role / Position
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-12 bg-gray-900 text-gray-200 border border-gray-700 
                          focus:ring-2 focus:ring-blue-500 hover:border-blue-500 
                          transition-all duration-300 rounded-lg shadow-sm focus:shadow-md"
                    disabled={loading}
                    placeholder="e.g., Full Stack Developer"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Job Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-gray-300 font-medium">
                  Job Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="h-20 bg-gray-900 text-gray-200 border border-gray-700 
                          focus:ring-2 focus:ring-blue-500 hover:border-blue-500 
                          transition-all duration-300 rounded-lg shadow-sm focus:shadow-md"
                    disabled={loading}
                    placeholder="Describe the job role..."
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Experience */}
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-gray-300 font-medium">
                  Years of Experience
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="h-12 bg-gray-900 text-gray-200 border border-gray-700 
                          focus:ring-2 focus:ring-blue-500 hover:border-blue-500 
                          transition-all duration-300 rounded-lg shadow-sm focus:shadow-md"
                    disabled={loading}
                    placeholder="e.g., 5 Years"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Tech Stack */}
          <FormField
            control={form.control}
            name="techStack"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-gray-300 font-medium">
                  Tech Stack
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="h-20 bg-gray-900 text-gray-200 border border-gray-700 
                          focus:ring-2 focus:ring-blue-500 hover:border-blue-500 
                          transition-all duration-300 rounded-lg shadow-sm focus:shadow-md"
                    disabled={loading}
                    placeholder="e.g., React, TypeScript, Node.js..."
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4">
            <Button
              type="reset"
              size="sm"
              variant="outline"
              disabled={isSubmitting || loading}
              className="border border-gray-600 text-gray-300 hover:bg-gray-700/50 transition flex items-center gap-2 px-4 py-2"
            >
              <Undo2 className="w-4 h-4 text-gray-400" /> {/* Reset Icon */}
              Reset
            </Button>

            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting || !isValid || loading}
              className="bg-gradient-to-r from-blue-600 to-cyan-400 
             hover:from-blue-500 hover:to-cyan-300 
             text-white font-semibold rounded-lg px-5 py-2.5 
             transition-all transform hover:scale-105 
             hover:shadow-lg hover:shadow-cyan-500/50 flex items-center gap-2"
            >
              {loading ? (
                <Loader className="animate-spin text-gray-50 w-5 h-5" />
              ) : (
                <>
                  <Send className="w-4 h-4 text-white" /> {/* Submit Icon */}
                  {actions}
                </>
              )}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
