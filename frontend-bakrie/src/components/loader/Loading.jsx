import React from "react"

const Loading = () => {
  return (
    <div className="flex items-center justify-center fixed inset-0 z-[9999]">
      <div
        className="w-6 aspect-square rounded-full animate-spin"
        style={{
          background: "radial-gradient(farthest-side, #FEE7E7 94%, transparent) top/4px 4px no-repeat, conic-gradient(transparent 30%, #FEE7E7)",
          WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 0)",
        }}
      ></div>
    </div>
  )
}

export default Loading