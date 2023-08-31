const LogoNameLink = () => {
    return (
        <a href="/" className="flex items-center space-x-4">
          <img src={new URL("../../public/icon.png", import.meta.url)} alt="logo" className="w-12 h-12" />
          <h1 className="font-extrabold text-3xl text-cyan-400">CodeFusion</h1>
        </a>
    )
};

export default LogoNameLink