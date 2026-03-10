import { Share2, Calendar, BarChart3, Zap, ShieldCheck, Layers } from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* HEADER */}

      <div className="max-w-6xl mx-auto px-6 py-16 text-center">

        <h1 className="text-4xl font-bold mb-4">
          Powerful Features
        </h1>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          OncePost helps you manage and publish content across multiple
          social media platforms from one simple dashboard.
        </p>

      </div>

      {/* FEATURES GRID */}

      <div className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-10">

        <Feature
          icon={<Share2 />}
          title="Cross Platform Posting"
          desc="Write a post once and publish it across multiple social platforms instantly."
        />

        <Feature
          icon={<Calendar />}
          title="Post Scheduling"
          desc="Schedule posts for the future and keep your content pipeline active."
        />

        <Feature
          icon={<BarChart3 />}
          title="Analytics Dashboard"
          desc="Track how your posts perform across different platforms."
        />

        <Feature
          icon={<Zap />}
          title="Fast Publishing"
          desc="Publish posts in seconds with our optimized infrastructure."
        />

        <Feature
          icon={<ShieldCheck />}
          title="Secure Authentication"
          desc="Your accounts are protected using secure authentication methods."
        />

        <Feature
          icon={<Layers />}
          title="Multiple Accounts"
          desc="Connect multiple social media accounts and manage them easily."
        />

      </div>

    </div>
  )
}



function Feature({
  icon,
  title,
  desc
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <div className="border rounded-xl p-6 hover:shadow-md transition">

      <div className="text-violet-600 mb-4">
        {icon}
      </div>

      <h3 className="font-semibold text-lg mb-2">
        {title}
      </h3>

      <p className="text-gray-600 text-sm">
        {desc}
      </p>

    </div>
  )
}