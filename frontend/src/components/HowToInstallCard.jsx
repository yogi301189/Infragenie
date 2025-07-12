// HowToInstallCard.jsx
export default function HowToInstallCard() {
  const tools = [
    {
      name: "Kubernetes",
      link: "https://kubernetes.io/docs/tasks/tools/",
      icon: "/icons/k8s.svg",
    },
    {
      name: "Terraform",
      link: "https://developer.hashicorp.com/terraform/install",
      icon: "/icons/terraform.svg",
    },
    {
      name: "Docker",
      link: "https://docs.docker.com/get-docker/",
      icon: "/icons/docker.svg",
    },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-6 w-full max-w-md mx-auto flex flex-col justify-between">
      <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-4 flex items-center">
        📥 How to Install
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4">
        Quickly get started by installing these essential tools.
      </p>
      <div className="flex flex-col gap-3">
        {tools.map((tool) => (
          <button
            key={tool.name}
            onClick={() => window.open(tool.link, "_blank")}
            className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 px-4 py-2 rounded-lg transition"
          >
            <div className="flex items-center gap-3">
              <img src={tool.icon} alt={tool.name} className="w-6 h-6" />
              <span className="font-medium text-zinc-700 dark:text-zinc-200">
                {tool.name}
              </span>
            </div>
            <span className="text-sm text-blue-500">Install →</span>
          </button>
        ))}
      </div>
    </div>
  );
}
