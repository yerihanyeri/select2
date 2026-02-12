const apiKey = ""; // 실제 배포 시에는 환경변수로 처리하는 것이 좋습니다.

export const callGeminiAPI = async (userUnput) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userUnput }] }],
          systemInstruction: {
            parts: [
              {
                text: `
                You are the Head Researcher at 'select.', a premium sleepwear brand.
                Tone: Scientific, Poetic, Comforting.
                Recommend ONE product (N.01~N.05) based on user input.
                Response JSON: { "recommendedId": "N.01", "reason": "Korean explanation", "ritual": "Korean ritual" }
              `,
              },
            ],
          },
          generationConfig: { responseMimeType: "application/json" },
        }),
      },
    );
    if (!response.ok) throw new Error("API Call Failed");
    const data = await response.json();
    return JSON.parse(data.candidates[0].content.parts[0].text);
  } catch (error) {
    console.error(error);
    return null;
  }
};
