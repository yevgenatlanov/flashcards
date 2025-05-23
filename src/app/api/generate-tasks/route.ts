import { z } from "zod";
import { getDatabase } from "@/config/db.config";
import { Task } from "@/entities/task.entity";
import { v4 as uuidv4 } from "uuid";

const multipleChoiceContentSchema = z.object({
  question: z.string(),
  options: z.array(z.string()).length(4),
  correctAnswer: z.string(),
  hint: z.string(),
});

const taskSchema = z.object({
  type: z.literal("multiple-choice"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  points: z.number(),
  timeEstimate: z.number(),
  content: multipleChoiceContentSchema,
});

const tasksSchema = z.array(taskSchema);

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { chapterData } = await req.json();

    if (!chapterData) {
      return new Response(
        JSON.stringify({ error: "Chapter data is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const systemPrompt = `You are a German language teacher creating A1 level exercises. 

Your task is to generate 10 multiple-choice questions based on the provided chapter data.

Requirements:
- Create questions that test both vocabulary and grammar from the chapter in German
- Use A1 level German (simple sentences, basic vocabulary)
- Each question should have exactly 4 options
- Make options roughly equal in length
- Include helpful hints in English
- Vary difficulty: 4 easy (5 points, 60 seconds), 4 medium (10 points, 90 seconds), 2 hard (15 points, 120 seconds)
- Questions should cover the grammar focus and vocabulary themes provided

Question types to include:
- Vocabulary translation (German to English or vice versa)
- Grammar completion (fill in correct verb form, article, etc.)
- Sentence structure and word order
- Contextual usage of vocabulary
- Modal verbs, pronouns, conjunctions as specified in grammar focus
- Different type: "fill-blank" | "essay" | "listening" | "multiple-choice"

Make sure questions are appropriate for A1 German learners and test the specific content from this chapter.`;

    const userPrompt = `Create 10 new multiple-choice questions for this German A1 chapter.

Respond ONLY with a valid JSON array of objects in this structure:

[
  {
    "type":  "fill-blank" | "essay" | "listening" | "multiple-choice" ,
    "difficulty": "easy" | "medium" | "hard",
    "points": 5 | 10 | 15,
    "timeEstimate": 60 | 90 | 120,
    "content": {
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "correctAnswer": "...",
      "hint": "..."
    }
  },
  ...
]

Chapter data:
Title: ${chapterData.title}
Description: ${chapterData.description}
Grammar Focus: ${chapterData.grammarFocus.join(", ")}
Vocabulary Themes: ${chapterData.vocabularyThemes.join(", ")}
${
  chapterData.tasks && chapterData.tasks.length > 0
    ? `Example tasks: ${JSON.stringify(chapterData.tasks, null, 2)}`
    : "No existing tasks"
}
`;

    // Debug: Log the request payload
    const requestPayload = {
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 3000,
      temperature: 0.7,
    };

    console.log("Request payload:", JSON.stringify(requestPayload, null, 2));

    const openaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify(requestPayload),
      }
    );

    // Debug: Log response details
    console.log("OpenAI Response Status:", openaiRes.status);
    console.log("OpenAI Response OK:", openaiRes.ok);

    const responseText = await openaiRes.text();
    console.log("OpenAI Raw Response:", responseText);

    if (!openaiRes.ok) {
      console.error("OpenAI API Error:", responseText);
      return new Response(
        JSON.stringify({
          error: "OpenAI API Error",
          status: openaiRes.status,
          details: responseText,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const responseData = JSON.parse(responseText);
    console.log(
      "Parsed OpenAI Response:",
      JSON.stringify(responseData, null, 2)
    );

    const content = responseData.choices?.[0]?.message?.content?.trim();
    console.log("Extracted content:", content);

    if (!content) {
      console.error("No content in OpenAI response:", responseData);
      return new Response(
        JSON.stringify({
          error: "No content returned from OpenAI",
          openaiResponse: responseData,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    let raw = content;
    if (raw.startsWith("```json")) {
      raw = raw
        .replace(/^```json/, "")
        .replace(/```$/, "")
        .trim();
    }

    console.log("Cleaned JSON:", raw);

    const parsed = tasksSchema.safeParse(JSON.parse(raw));

    if (!parsed.success) {
      console.error("Validation error:", parsed.error);
      return new Response(
        JSON.stringify({
          error: "Invalid task format",
          validationErrors: parsed.error.errors,
          rawContent: raw,
        }),
        {
          status: 422,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const db = await getDatabase();
    const taskRepo = db.getRepository(Task);

    const saved = await Promise.all(
      parsed.data.map((task) => {
        const entity = taskRepo.create({
          id: uuidv4(),
          chapterId: chapterData.id,
          type: task.type,
          difficulty: task.difficulty,
          points: task.points,
          timeEstimate: task.timeEstimate,
          content: task.content,
        });
        return taskRepo.save(entity);
      })
    );

    return new Response(JSON.stringify(saved), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating tasks:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to generate tasks",
        details: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
