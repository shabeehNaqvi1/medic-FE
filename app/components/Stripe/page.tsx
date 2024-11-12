import CheckoutButton from "../CheckoutButton";

const IndexPage = () => {
  const priceId = "price_1PdBusRwCMhJDLZknZUFP9wx"; // Replace with your actual price ID

  return (
    <div>
      <h1>My Product</h1>
      <CheckoutButton priceId={priceId} />
    </div>
  );
};

export default IndexPage;
