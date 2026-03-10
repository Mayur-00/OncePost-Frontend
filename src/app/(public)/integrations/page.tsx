export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* HEADER */}

      <div className="max-w-6xl mx-auto px-6 py-16 text-center">

        <h1 className="text-4xl font-bold mb-4">
          Integrations
        </h1>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Connect OncePost with your favorite social media platforms
          and manage everything from one place.
        </p>

      </div>

      {/* INTEGRATIONS GRID */}

      <div className="max-w-5xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-8">

        <IntegrationCard
          name="LinkedIn"
          desc="Publish professional content to your LinkedIn profile or pages."
        />

        <IntegrationCard
          name="X (Twitter)"
          desc="Share posts and updates instantly to your X audience."
        />

        <IntegrationCard
          name="Facebook"
          desc="Manage and publish posts to your Facebook pages."
        />

        <IntegrationCard
          name="Instagram"
          desc="Schedule and share posts to Instagram accounts."
        />

        <IntegrationCard
          name="Threads"
          desc="Post updates and conversations on Threads."
        />

        <IntegrationCard
          name="More coming soon"
          desc="We are continuously adding support for new platforms."
        />

      </div>

    </div>
  )
}



function IntegrationCard({
  name,
  desc
}: {
  name: string
  desc: string
}) {
  return (
    <div className="border rounded-xl p-6 hover:shadow-md transition">

      <h3 className="font-semibold text-lg mb-2">
        {name}
      </h3>

      <p className="text-gray-600 text-sm">
        {desc}
      </p>

    </div>
  )
}