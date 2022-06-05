function Content(props) {
  return (
    <div className="text-primary text-center md:flex md:justify-center lg:w-full">
      <div className="py-8 pt-2 px-10 2xl:w-2/3 md:flex md:flex-col md:items-center">
        {props.children}
      </div>
    </div>
  );
}

export default Content;
