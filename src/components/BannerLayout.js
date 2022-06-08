function Layout(props) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center">
      {props.children}
    </div>
  );
}

function SideBanner(props) {
  return (
    <div className="bg-primary h-56 text-white flex flex-col items-center justify-center lg:h-screen lg:w-3/5 lg:text-left 2xl:w-2/5">
      {props.children}
    </div>
  );
}

function Content(props) {
  return (
    <div className="text-primary text-center md:flex md:justify-center lg:w-full">
      <div className="py-8 pt-2 px-10 2xl:w-2/3 md:flex md:flex-col md:items-center">
        {props.children}
      </div>
    </div>
  );
}

const components = { Layout, SideBanner, Content };
export default components;
