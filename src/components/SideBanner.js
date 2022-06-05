function SideBanner(props) {
  return (
    <div className="bg-primary h-56 text-white flex flex-col items-center justify-center lg:h-screen lg:w-3/5 lg:text-left 2xl:w-2/5">
      {props.children}
    </div>
  );
}

export default SideBanner;
