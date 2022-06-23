function Layout(props) {
  return (
    <div className="flex h-screen items-center md:justify-center p-9">
      {props.children}
    </div>
  );
}

function Form(props) {
  return <div className="w-full lg:w-1/3 xl:w-1/5">{props.children}</div>;
}

function Image(props) {
  return (
    <div className="hidden lg:block lg:w-2/3 xl:2/5 md:mr-24">
      <img src={props.src} alt="" className="lg:w-2/3 max-w-xl mx-auto" />
    </div>
  );
}

const components = { Layout, Form, Image };
export default components;
