"use client";

import { createClient } from "@/lib/supabase/client";
import { ArrowRight, Sparkles } from "lucide-react";
import { FormEvent, useState } from "react";

interface FormData {
  email: string;
  role: string;
  contentFrequency: string;
}

const WaitlistPage = () => {
  const supabase = createClient();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    role: "",
    contentFrequency: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase
        .from("waitlist")
        .insert([
          {
            email: formData.email,
            role: formData.role,
            content_frequency: formData.contentFrequency,
          },
        ])
        .select();

      if (error) throw error;

      setSubmitted(true);
      setFormData({ email: "", role: "", contentFrequency: "" });
    } catch (err: unknown) {
      if (err instanceof Error && (err as { code?: string }).code === "23505") {
        // unique violation
        setError("This email has already joined the waitlist!");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  interface ChangeEvent {
    target: {
      name: string;
      value: string;
    };
  }

  const handleChange = (e: ChangeEvent) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50/30 to-white relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
        <div className="absolute top-20 -left-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 rounded-full text-sm font-medium mb-4 gap-2">
            <Sparkles className="w-4 h-4" />
            Coming Soon - Early Access Available
          </span>
          <h1 className="text-3xl md:text-6xl font-bold tracking-tight mb-6 ">
            Turn technical videos into
            <span className="block  bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              release-ready docs
            </span>
          </h1>
          <p className="md:text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
            Stop spending hours writing documentation. Our AI converts your
            technical videos into accurate docs, tutorials, and blog posts —
            saving 4+ hours per video.
          </p>
          <p className="text-gray-500 mb-8">
            🚀 Early access opening for first 100 sign ups
          </p>
        </div>

        {/* Waitlist Form */}
        <div className="max-w-lg mx-auto mb-16">
          <div className="backdrop-blur-sm bg-white/80 p-8 rounded-2xl shadow-lg border border-gray-200/50">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Work email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/90 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/90 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select your role</option>
                    <option value="advocate">Developer Advocate</option>
                    <option value="relations">Developer Relations</option>
                    <option value="founder">Founder / Entrepreneur</option>
                    <option value="developer">Developer / Engineer</option>
                    <option value="educator">Technical Educator</option>
                    <option value="content">Technical Content Creator</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    How often do you create technical content?
                  </label>
                  <select
                    name="contentFrequency"
                    value={formData.contentFrequency}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/90 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select frequency</option>
                    <option value="weekly">Weekly or more</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="rarely">Rarely</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg font-medium ${
                    loading ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Joining..." : "Join Early Access"}{" "}
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-xs text-center text-gray-500">
                  💡 Early access members get 50% off lifetime pricing
                </p>
              </form>
            ) : (
              <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
                <h3 className="font-bold mb-2 text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  You&apos;re on the list! 🎉
                </h3>
                <p className="text-gray-600 mb-4">
                  Share with others building technical content:
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() =>
                      window.open(
                        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                          "Excited to try this AI tool that converts technical videos into documentation! Join the waitlist:"
                        )}`
                      )
                    }
                    className="text-blue-600 hover:text-blue-700 flex items-center gap-2 font-medium"
                  >
                    Share on Twitter <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Problem Validation */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold mb-8 ">
            Why Technical Teams Need This
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="backdrop-blur-sm bg-white/80 p-6 rounded-2xl shadow-lg border border-gray-200/50">
              <div className="text-4xl mb-2 font-bold ">4-8h</div>
              <p className="text-gray-600">
                Average time spent converting each technical video into
                documentation
              </p>
            </div>
            <div className="backdrop-blur-sm bg-white/80 p-6 rounded-2xl shadow-lg border border-gray-200/50">
              <div className="text-4xl mb-2 font-bold ">60%</div>
              <p className="text-gray-600">
                Of technical content never gets documented due to time
                constraints
              </p>
            </div>
            <div className="backdrop-blur-sm bg-white/80 p-6 rounded-2xl shadow-lg border border-gray-200/50">
              <div className="text-4xl mb-2 font-bold ">2x</div>
              <p className="text-gray-600">
                Increase in content reach with proper documentation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitlistPage;
