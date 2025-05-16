import React, { useState } from "react";

export default function Upload_question() {
  const [form, setForm] = useState({
    subject: "",
    class: "",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    questionImage: "",
    hint: {
      text: "",
      image: "",
      video: "",
    },
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("option")) {
      const index = parseInt(name.replace("option", ""));
      const updatedOptions = [...form.options];
      updatedOptions[index] = value;
      setForm({ ...form, options: updatedOptions });
    } else if (
      name === "hintText" ||
      name === "hintImage" ||
      name === "hintVideo"
    ) {
      setForm({
        ...form,
        hint: {
          ...form.hint,
          [name === "hintText"
            ? "text"
            : name === "hintImage"
            ? "image"
            : "video"]: value,
        },
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const uploadToCloudinary = async (file, resource_type = "image") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    const url = `https://api.cloudinary.com/v1_1/dmebh0vcd/${resource_type}/upload`;

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data.secure_url;
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const isVideo = type === "video";
    const uploadedUrl = await uploadToCloudinary(
      file,
      isVideo ? "video" : "image"
    );

    if (type === "questionImage") {
      setForm({ ...form, questionImage: uploadedUrl });
    } else {
      setForm({
        ...form,
        hint: {
          ...form.hint,
          [type]: uploadedUrl,
        },
      });
    }

    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Server responded with " + response.status);
      }

      alert("Question uploaded successfully!");

      setForm({
        subject: "",
        class: "",
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        questionImage: "",
        hint: {
          text: "",
          image: "",
          video: "",
        },
      });
    } catch (error) {
      alert("Upload failed: " + error.message);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload Question</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Subject"
          required
        />

        <input
          type="text"
          name="class"
          value={form.class}
          onChange={handleChange}
          placeholder="Class"
          required
        />

        <input
          type="text"
          name="question"
          value={form.question}
          onChange={handleChange}
          placeholder="Question"
          required
        />

        <label>Upload Question Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileUpload(e, "questionImage")}
        />
        {form.questionImage && (
          <img src={form.questionImage} alt="Question" className="max-w-xs" />
        )}

        {form.options.map((opt, index) => (
          <input
            key={index}
            type="text"
            name={`option${index}`}
            value={opt}
            onChange={handleChange}
            placeholder={`Option ${index + 1}`}
            required
          />
        ))}

        <input
          type="text"
          name="correctAnswer"
          value={form.correctAnswer}
          onChange={handleChange}
          placeholder="Correct Answer"
          required
        />

        <input
          type="text"
          name="hintText"
          value={form.hint.text}
          onChange={handleChange}
          placeholder="Hint Text"
        />

        <label>Upload Hint Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileUpload(e, "image")}
        />
        {form.hint.image && (
          <img src={form.hint.image} alt="Hint" className="max-w-xs" />
        )}

        <label>Upload Hint Video:</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => handleFileUpload(e, "video")}
        />
        {form.hint.video && (
          <video controls className="max-w-xs">
            <source src={form.hint.video} type="video/mp4" />
          </video>
        )}

        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {uploading ? "Uploading..." : "Submit Question"}
        </button>
      </form>
    </div>
  );
}
