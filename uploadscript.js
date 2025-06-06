import fs from "node:fs";
import axios from "axios";
import FormData from "form-data";

async function generateImage() {
  try {
    const form = new FormData();
    form.append(
      "prompt",
      "An eco-friendly reusable bag made of cloth, placed on a natural background with green plants, symbolizing sustainability and environmental care. The bag is sturdy, washable, and ideal for daily shopping. Illustration style, bright and clean"
    );
    form.append("output_format", "webp");

    const response = await axios.post(
      "https://api.stability.ai/v2beta/stable-image/generate/ultra",
      form,
      {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer sk-KXTDlcVSynVHPvna8wjb4AhuKS5A0ahk99ttwvKrIhDkIe0J`,
          Accept: "image/*",
        },
        responseType: "arraybuffer",
      }
    );

    if (response.status === 200) {
      fs.writeFileSync("./lighthouse.webp", Buffer.from(response.data));
      console.log("✅ Image saved as lighthouse.webp");
    } else {
      throw new Error(`Error ${response.status}: ${response.data.toString()}`);
    }
  } catch (error) {
    console.error("❌ Failed to generate image:", error.message);
  }
}

generateImage();
