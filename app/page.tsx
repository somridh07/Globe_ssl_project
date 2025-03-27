import EarthGlobe from "@/components/earth-globe"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 bg-sky-50">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
        <h1 className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-sky-100 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-sky-100 lg:p-4 lg:dark:bg-zinc-800/30">
          Earth Temperature Globe
        </h1>
      </div>

      <div className="relative flex place-items-center w-full h-[80vh]">
        <EarthGlobe />
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-sky-200/50 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">Instructions</h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-70">
            Rotate the globe by dragging and click on a region to see its temperature.
          </p>
        </div>
      </div>
    </main>
  )
}

