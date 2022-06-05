function BannerPage(props) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center">
      {props.children}
    </div>
  );
}

export default BannerPage;
