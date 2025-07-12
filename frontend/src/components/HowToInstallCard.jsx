import React from "react";

const HowToInstallCard = () => {
  return (
    <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg w-full md:w-[400px]">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        🛠️ How to Install
      </h2>
      <div className="flex flex-col gap-4">
        <a
          href="https://kubernetes.io/docs/setup/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-blue-300 hover:text-blue-500 transition"
        >
          <img src="/icons/k8s.svg" alt="Kubernetes" className="w-6 h-6" />
          Kubernetes
        </a>
        <a
          href="https://developer.hashicorp.com/terraform/downloads"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-purple-300 hover:text-purple-500 transition"
        >
          <img src="/icons/terraform.svg" alt="Terraform" className="w-6 h-6" />
          Terraform
        </a>
        <a
          href="https://docs.docker.com/get-docker/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-cyan-300 hover:text-cyan-500 transition"
        >
          <img src="/icons/docker.svg" alt="Docker" className="w-6 h-6" />
          Docker
        </a>
      </div>
    </div>
  );
};

export default HowToInstallCard;
