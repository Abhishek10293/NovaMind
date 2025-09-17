"use client";

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { useConvex, useMutation } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { AuthContext } from "@/context/authcontext";
import AiAssistantsList from "@/src/Services/AI_AssistantList";
import { BlurFade } from "@/src/components/magicui/blur-fade";
import { RainbowButton } from "@/src/components/magicui/rainbow-button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader } from "lucide-react";
import Image from "next/image";

export type AssistantType = {
  id: number;
  name: string;
  title: string;
  image: string;
  instruction: string;
  userInstruction: string;
  sampleQuestions: string[];
  aiModelId?: string;
  credits?: number;
};

const AiAssistants: React.FC = () => {
  const [selectedAssistant, setSelectedAssistant] = useState<AssistantType[]>([]);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);
  const router = useRouter();
  const convex = useConvex();
  const insertAssistant = useMutation(api.userAiAssistants.InsertSelectedAssistants);

  // Toggle selection of an assistant
  const handleSelect = (assistant: AssistantType) => {
    setSelectedAssistant(prev =>
      prev.some(item => item.id === assistant.id)
        ? prev.filter(item => item.id !== assistant.id)
        : [...prev, assistant]
    );
  };

  // Check if assistant is selected
  const isSelected = (assistant: AssistantType) =>
    selectedAssistant.some(item => item.id === assistant.id);

  // Continue button click
  const handleContinue = async () => {
    if (!user?._id) return console.error("User not loaded");

    try {
      setLoading(true);

      const safeRecords = selectedAssistant.map(a => ({
        id: a.id,
        name: a.name,
        title: a.title,
        image: a.image,
        instruction: a.instruction,
        userInstruction: a.userInstruction,
        sampleQuestions: a.sampleQuestions,
      }));

      await insertAssistant({ uid: user._id as Id<"users">, records: safeRecords });

      router.push("/workspace");
    } catch (err) {
      console.error("Failed to insert assistants", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-10 mt-15 md:px-28 lg:px-36 xl:px-48">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <BlurFade delay={0.15} inView>
            <h2 className="text-2xl font-semibold tracking-wide">
              Welcome To The World of AI Assistants <span className="ml-3 text-[40px]">🧸</span>
            </h2>
          </BlurFade>
          <BlurFade delay={0.3} inView>
            <p className="text-md text-gray-60 font-light">
              Choose your AI Companion to Simplify Your Tasks <span className="ml-3 text-[20px]">🚀</span>
            </p>
          </BlurFade>
        </div>

        <RainbowButton
          className="rounded-xl"
          disabled={selectedAssistant.length === 0 || loading}
          onClick={handleContinue}
        >
          {loading && <Loader className="animate-spin mr-2" />} Continue
        </RainbowButton>
      </div>

      {/* Assistants Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5">
        {AiAssistantsList.map((assistant, idx) => (
          <BlurFade key={assistant.id} delay={0.1 + idx * 0.15} inView>
            <div
              className="relative cursor-pointer hover:scale-105 transition-all ease-in-out p-3 rounded-xl hover:border"
              onClick={() => handleSelect(assistant)}
            >
              <Checkbox className="absolute m-2" checked={isSelected(assistant)} />
              <Image
                src={assistant.image}
                alt={assistant.title}
                width={600}
                height={600}
                className="h-[200px] w-[200px] object-cover rounded-xl"
              />
              <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">{assistant.name}</h2>
              <h2 className="text-md font-light text-gray-500 dark:text-gray-300">{assistant.title}</h2>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
};

export default AiAssistants;
