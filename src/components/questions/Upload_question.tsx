import React, { useState } from "react";

export default function UploadQuestion() {
  const initialFormState = {
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
  };

  const [form, setForm] = useState(initialFormState);
  const [uploading, setUploading] = useState(false);
  const [activeSection, setActiveSection] = useState("basic");

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

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

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

      if (!uploadedUrl) {
        throw new Error("Failed to get upload URL");
      }

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      alert("Question uploaded successfully!");
      setForm(initialFormState);
      setActiveSection("basic");
    } catch (error) {
      console.error("Submission error:", error);
      alert(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const renderBasicSection = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="e.g., Mathematics"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Class/Grade
          </label>
          <input
            type="text"
            name="class"
            value={form.class}
            onChange={handleChange}
            placeholder="e.g., 10th Grade"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Question
        </label>
        <textarea
          name="question"
          value={form.question}
          onChange={handleChange}
          placeholder="Enter your question here"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-20"
          required
        />
      </div>

      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Question Image (Optional)
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, "questionImage")}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {form.questionImage && (
          <div className="mt-2">
            <img
              src={form.questionImage}
              alt="Question"
              className="max-h-40 rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderOptionsSection = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {form.options.map((opt, index) => (
          <div key={index} className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Option {index + 1}
            </label>
            <input
              type="text"
              name={`option${index}`}
              value={opt}
              onChange={handleChange}
              placeholder={`Option ${index + 1}`}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}
      </div>

      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Correct Answer
        </label>
        <select
          name="correctAnswer"
          value={form.correctAnswer}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select correct option</option>
          {form.options.map((opt, index) => (
            <option key={index} value={opt} disabled={!opt}>
              {opt || `Option ${index + 1} (empty)`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderHintSection = () => (
    <div className="space-y-4">
      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Hint Text (Optional)
        </label>
        <textarea
          name="hintText"
          value={form.hint.text}
          onChange={handleChange}
          placeholder="Provide a helpful hint for students"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-20"
        />
      </div>

      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Hint Image (Optional)
        </label>
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            name="hintImage"
            value={form.hint.image}
            onChange={handleChange}
            placeholder="Paste image URL"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">or</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, "image")}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        {form.hint.image && (
          <div className="mt-2">
            <img
              src={form.hint.image}
              alt="Hint"
              className="max-h-40 rounded-md"
            />
          </div>
        )}
      </div>

      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Hint Video (Optional)
        </label>
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            name="hintVideo"
            value={form.hint.video}
            onChange={handleChange}
            placeholder="Paste video URL (YouTube, etc.)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">or</span>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleFileUpload(e, "video")}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        {form.hint.video && (
          <div className="mt-2">
            {form.hint.video.includes("youtube.com") ? (
              <iframe
                width="320"
                height="180"
                src={form.hint.video.replace("watch?v=", "embed/")}
                title="YouTube video preview"
                frameBorder="0"
                allowFullScreen
                className="rounded-md"
              ></iframe>
            ) : (
              <video controls className="max-w-full h-40 rounded-md">
                <source src={form.hint.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto my-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
        Upload Question
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex mb-6 border-b border-gray-200">
          <button
            type="button"
            onClick={() => setActiveSection("basic")}
            className={`px-4 py-2 font-medium ${
              activeSection === "basic"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Basic Info
          </button>
          <button
            type="button"
            onClick={() => setActiveSection("options")}
            className={`px-4 py-2 font-medium ${
              activeSection === "options"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Options
          </button>
          <button
            type="button"
            onClick={() => setActiveSection("hints")}
            className={`px-4 py-2 font-medium ${
              activeSection === "hints"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Hints
          </button>
        </div>

        <div className="mb-6">
          {activeSection === "basic" && renderBasicSection()}
          {activeSection === "options" && renderOptionsSection()}
          {activeSection === "hints" && renderHintSection()}
        </div>

        <div className="flex justify-between">
          {activeSection === "basic" ? (
            <div></div>
          ) : (
            <button
              type="button"
              onClick={() =>
                setActiveSection(
                  activeSection === "options" ? "basic" : "options"
                )
              }
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Previous
            </button>
          )}

          {activeSection === "hints" ? (
            <button
              type="submit"
              disabled={uploading}
              className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                uploading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {uploading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Submit Question"
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={() =>
                setActiveSection(
                  activeSection === "basic" ? "options" : "hints"
                )
              }
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
