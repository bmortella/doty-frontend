function BannerPage(props) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center">
      {/* <div className="bg-primary h-56 text-white flex flex-col items-center justify-center lg:h-screen lg:w-3/5 lg:text-left 2xl:w-2/5"></div>
      <div className="text-primary text-center md:flex md:justify-center lg:w-full"></div> */}
      {props.children}
    </div>
  );
}

export default BannerPage;
