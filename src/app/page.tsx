import RequestsGrid from "../components/request/Grid";

export default async function Home() {
  return (
    <div className="content-wide flex flex-col justify-center">
      <RequestsGrid />
    </div>
  );
}
