import { supabase } from "@/lib/supabase";
const handleError = (error: any) => {
  return error instanceof Error ? error.message : "Something went wrong";
};

const headers = {
  "Content-Type": "application/json",
};

export async function uploadImage(file: File, name: string) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${name + Math.floor(Math.random() * 1000)}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("couples")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from("couples").getPublicUrl(fileName);

  return {
    url: data.publicUrl,
    path: fileName
  };
}

export async function deleteImage(fileUrlOrPath: string, bucket: string = "couples") {
  const marker = `/object/public/${bucket}/`;
  const isFullUrl = fileUrlOrPath.includes(marker);
  const filePath = isFullUrl
    ? fileUrlOrPath.slice(fileUrlOrPath.indexOf(marker) + marker.length)
    : fileUrlOrPath;

  const { error } = await supabase.storage.from(bucket).remove([filePath]);
  if (error) throw error;
}

export async function auth() {
  try {
    const req = await fetch("/api/v1/auth/token", {
      method: "POST",
      headers,
    });
    const data = await req.json();
    if (!data.initialize) return { success: false, message: data.message };
    return data;
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
}

export function getQuotes() {
  const quotes = [
    "Some feelings deserve more than a simple text.",
    "A 'good morning' text is nice. A love letter is proof.",
    "Love isn't loud. It's the effort you put into being remembered.",
    "If it crossed your mind more than once, it deserves more than one line.",
    "Texts get left on read. Letters get kept forever.",
    "Say it before it becomes a memory you wish you'd shared.",
    "Not everything you feel needs to fit in a chat bubble.",
    "The right words, at the right time, can outlive the moment itself.",
    "Love that's easy to say deserves to be said properly.",
    "A heart that's full doesn't need to abbreviate.",
    "Some 'I miss you's are too big for emojis.",
    "You don't fall out of love, you just stop writing it down.",
    "The ones who matter deserve paragraphs, not just punctuation.",
    "Feelings fade when unspoken. Words make them stay.",
    "Don't let autocorrect finish what your heart started.",
    "A voice note is sweet. A letter is forever.",
    "The heart remembers what the group chat forgets.",
    "You don't need the perfect words, just the honest ones.",
    "Some love is too big to send as a reply.",
    "Write it down before the feeling learns how to fade.",
    "A love unspoken is still a love unfinished.",
    "The best love letters are just honesty wearing nice handwriting.",
    "If you have to think twice before saying it, it's worth writing instead.",
    "Silence forgets. Ink remembers.",
    "A heartfelt paragraph outlives a hundred perfect texts.",
    "Some people are worth the extra sentence.",
    "You can delete a message. You can't delete a memory made of words.",
    "Real love doesn't fit in a notification.",
    "Say the soft things before the moment turns hard to reach.",
    "The love you almost didn't say out loud is usually the one that mattered most.",
  ];
  const randomQuotes = quotes[Math.floor(Math.random() * quotes.length)];
  return randomQuotes;
}

//loveLetter
export async function createLetter(
  recipient: string,
  selectedTemplate: string,
  selectedFont: string,
  message: string,
  closing: string,
  sender?: string,
) {
  try {
    const req = await fetch("/api/v1/kenshie/loveLetter", {
      method: "POST",
      headers,
      body: JSON.stringify({
        recipient,
        sender,
        selectedTemplate,
        selectedFont,
        message,
        closing,
      }),
    });
    const data = await req.json();
    if (!data.success) return { success: false, message: data.message };
    return data;
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
}

export async function getLetter(id: string) {
  try {
    const req = await fetch(`/api/v1/kenshie/loveLetter?id=${id}`, {
      method: "GET",
      headers,
    });
    const data = await req.json();
    if (!data.success) return { success: false, message: data.message };
    return data;
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
}
//end of loveLetter

//serenade
export async function searchSongs(title: string) {
  try {
    const req = await fetch(
      `https://jeextract.vercel.app/api/proxy?q=${title + "official Audio"}`,
    );
    const data = await req.json();
    if (data.length < 0)
      return { success: false, message: "No music was found" };
    return data;
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
}
export async function createSerenade(
  recipient: string,
  message: string,
  songId: string,
  sender?: string,
) {
  try {
    const req = await fetch("/api/v1/kenshie/serenade", {
      method: "POST",
      headers,
      body: JSON.stringify({
        recipient,
        message,
        sender,
        songId,
      }),
    });
    const data = await req.json();
    if (!data.success) return { success: false, message: data.message };
    return data;
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
}
export async function getSerenade(id: string) {
  try {
    const req = await fetch(`/api/v1/kenshie/serenade?id=${id}`, {
      method: "GET",
      headers,
    });
    const data = await req.json();
    if (!data.success) return { success: false, message: data.message };
    return data;
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
}
//end of serenade

//loveCapsule
export async function createCapsule(
  recipient: string,
  sender: string,
  message: string,
  unlockDate: string,
  unlockTime: string,
) {
  try {
    const req = await fetch("/api/v1/kenshie/lovecapsule", {
      method: "POST",
      headers,
      body: JSON.stringify({
        recipient,
        sender,
        message,
        unlockDate,
        unlockTime,
      }),
    });
    const data = await req.json();
    if (!data.success) return { success: false, message: data.message };
    return data;
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
}
export async function getCapsule(id: string) {
  try {
    const req = await fetch(`/api/v1/kenshie/lovecapsule?id=${id}`, {
      method: "GET",
      headers,
    });
    const data = await req.json();
    if (!data.success) return { success: false, message: data.message };
    return data;
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
}
//end of loveCapsule

//kenshie
export async function createKenshie(
  yourName: string,
  theirName: string,
  image: string,
  beginning?: string,
  firstImpression?: string,
  firstMemorableMoment?: string,
  littleThings?: string,
  importantDate?: string,
  challenge?: string,
  realization?: string,
  favoriteMemory?: string,
  loveTruth?: string,
  future?: string,
) {
  try {
    const req = await fetch("/api/v1/kenshie/kenshie", {
      method: "POST",
      headers,
      body: JSON.stringify({yourName, theirName, beginning, firstImpression, firstMemorableMoment, littleThings, importantDate, challenge, realization, favoriteMemory, loveTruth, future, image})
    });
    const data = await req.json();
    if(!data.success) return { success: false, message: data.message};
    return data;
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
}
export async function getKenshie(id: string) {
  try {
    const req = await fetch(`/api/v1/kenshie/kenshie?id=${id}`, {
      method: "GET",
      headers,
    });
    const data = await req.json();
    if (!data.success) return { success: false, message: data.message };
    return data;
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
}
//end of kenshie
