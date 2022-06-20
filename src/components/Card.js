function Card(props) {
  return (
    <div className="border border-[#EEEDFF] shadow rounded-lg p-6">
      <h2 className="text-sm mb-1">{props.title}</h2>
      <p className="text-secondary-blue font-semibold text-3xl">{props.text}</p>
    </div>
  );
}

export default Card;
