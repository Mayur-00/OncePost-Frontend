import Link from "next/link";
import { Navbar } from "@/components/landingPage/Navbar";
import { Footer } from "@/components/landingPage/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
              Post Once,{" "}
              <span className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
                Share Everywhere
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg text-balance">
              Schedule and cross-post to multiple social media platforms
              instantly. Save hours every week managing content across different
              networks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup"
                className="inline-flex bg-violet-600 text-white lg:bg-white lg:text-black border border-violet-500 hover:shadow-2xl items-center justify-center px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:text-white hover:bg-violet-500 transition-all  hover:scale-105 duration-200"
              >
                Start for Free
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <Link
                href="/help"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-border hover:bg-black hover:text-white transition-colors"
              >
                Learn More
              </Link>
            </div>

            {/* Trust Badge */}
            
          </div>

          {/* Hero Image */}
          <div className="relative shadow-2xl shadow-violet-500 rounded-xl">
            <div className="absolute shadow-md opacity-10 blur-3xl rounded-3xl overflow-hidden " />
            <img src="dash.png" alt="" className="object-cover h-full w-full rounded-md" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Everything you need to manage social media
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Powerful features designed to save you time and help you grow your
            social presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "📅",
              title: "Smart Scheduling",
              description:
                "Schedule posts for optimal times across all platforms instantly.",
            },
            {
              icon: "🔗",
              title: "Multi-Platform",
              description:
                "Post to Twitter, Instagram, Facebook, LinkedIn, and more at once.",
            },
            {
              icon: "📊",
              title: "Analytics",
              description:
                "Track engagement and performance across all your accounts.",
            },
            {
              icon: "⚡",
              title: "Instant Publishing",
              description:
                "Go live on multiple networks without switching between apps.",
            },
            {
              icon: "🎨",
              title: "Rich Media Support",
              description:
                "Upload images, videos, and media that automatically optimize for each platform.",
            },
            {
              icon: "👥",
              title: "Team Collaboration",
              description:
                "Invite team members, manage permissions, and collaborate seamlessly.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-8 rounded-xl border border-border bg-card hover:shadow-lg hover:border-primary/50 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Platforms */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Supported Platforms
          </h2>
          <p className="text-muted-foreground">
            Connect your accounts and start posting everywhere
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            "Twitter",
            "Instagram",
            "Facebook",
            "LinkedIn",
            "TikTok",
            "Pinterest",
            "YouTube",
            "Bluesky",
          ].map((platform, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-border bg-card hover:bg-muted transition-all duration-300 text-center"
            >
              <p className="font-semibold">{platform}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mb-24">
        <div className="bg-gradient-to-r from-violet-600 to-purple-700 rounded-2xl p-12 md:p-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
            Ready to post smarter?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto text-balance">
            Join thousands of content creators and marketing teams posting more
            efficiently.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-primary font-semibold hover:bg-white/90 transition-all hover:shadow-lg duration-200"
          >
            Get Started Free
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
