import React, { useState } from "react";

export default function SimpleQuestionForm() {
  const initialFormState = {
    subject: "",
    class: "",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    questionImage: "",
    hint: { text: "", image: "", video: "" },
  };

  const [form, setForm] = useState(initialFormState);
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

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dmebh0vcd/${resource_type}/upload`,
        { method: "POST", body: formData }
      );

      if (!response.ok) throw new Error(`Upload failed: ${response.status}`);
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Upload error:", error);
      alert(`Upload failed: ${error.message}`);
      return null;
    }
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const isVideo = type === "video";
      const uploadedUrl = await uploadToCloudinary(
        file,
        isVideo ? "video" : "image"
      );

      if (!uploadedUrl) throw new Error("Failed to get upload URL");

      if (type === "questionImage") {
        setForm({ ...form, questionImage: uploadedUrl });
      } else {
        setForm({
          ...form,
          hint: { ...form.hint, [type]: uploadedUrl },
        });
      }
    } catch (error) {
      console.error("File upload error:", error);
      alert(`File upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const response = await fetch("http://localhost:5000/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok)
        throw new Error(`Server responded with ${response.status}`);

      alert("Question uploaded successfully!");
      setForm(initialFormState);
    } catch (error) {
      console.error("Submission error:", error);
      alert(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-2xl mx-auto my-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Upload Question</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="px-3 py-2 border rounded-md"
            required
          />
          <input
            type="text"
            name="class"
            value={form.class}
            onChange={handleChange}
            placeholder="Class/Grade"
            className="px-3 py-2 border rounded-md"
            required
          />
        </div>

        <textarea
          name="question"
          value={form.question}
          onChange={handleChange}
          placeholder="Question"
          className="w-full px-3 py-2 border rounded-md min-h-16"
          required
        />

        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, "questionImage")}
            className="w-full"
          />
          {form.questionImage && (
            <img
              src={form.questionImage}
              alt="Question"
              className="mt-2 max-h-32 rounded"
            />
          )}
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {form.options.map((opt, index) => (
            <input
              key={index}
              type="text"
              name={`option${index}`}
              value={opt}
              onChange={handleChange}
              placeholder={`Option ${index + 1}`}
              className="px-3 py-2 border rounded-md"
              required
            />
          ))}
        </div>

        <select
          name="correctAnswer"
          value={form.correctAnswer}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        >
          <option value="">Select correct option</option>
          {form.options.map((opt, index) => (
            <option key={index} value={opt} disabled={!opt}>
              {opt || `Option ${index + 1} (empty)`}
            </option>
          ))}
        </select>

        {/* Hints */}
        <div className="space-y-3 pt-2 border-t">
          <textarea
            name="hintText"
            value={form.hint.text}
            onChange={handleChange}
            placeholder="Hint Text (Optional)"
            className="w-full px-3 py-2 border rounded-md"
          />

          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, "image")}
              placeholder="Hint Image"
              className="w-full"
            />
            {form.hint.image && (
              <img
                src={form.hint.image}
                alt="Hint"
                className="mt-2 max-h-32 rounded"
              />
            )}
          </div>

          <div>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleFileUpload(e, "video")}
              placeholder="Hint Video"
              className="w-full"
            />
            {form.hint.video && !form.hint.video.includes("youtube.com") && (
              <video controls className="mt-2 max-h-32 rounded">
                <source src={form.hint.video} type="video/mp4" />
                Your browser does not support video.
              </video>
            )}
            {form.hint.video && form.hint.video.includes("youtube.com") && (
              <iframe
                width="100%"
                height="180"
                src={form.hint.video.replace("watch?v=", "embed/")}
                title="YouTube preview"
                className="mt-2 rounded"
              ></iframe>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={uploading}
          className={`px-4 py-2 bg-blue-600 text-white rounded-md w-full ${
            uploading ? "opacity-70" : "hover:bg-blue-700"
          }`}
        >
          {uploading ? "Processing..." : "Submit Question"}
        </button>
      </form>
    </div>
  );
}
