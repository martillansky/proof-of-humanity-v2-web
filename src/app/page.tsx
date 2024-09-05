import { revalidateTag } from "next/cache";
import RequestsGrid from "../components/request/Grid";
import { setConfigSetSelection } from "contracts";
import { redirect } from "next/navigation";
import mainConfig from "mainConfig";

export async function changeConfig(configSet: any) {
  // Simulating a database update or configuration change
  setConfigSetSelection(configSet);
  
  window.localStorage.setItem('chainSet', configSet.chainSetId);
  console.log("PAGEEEE: ", configSet);
  if (configSet.chainSetId === 'main') mainConfig().setMainnet()
  else mainConfig().setMainnet()

  //process.env.CHAIN_SET = configSet.chainSetId;
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
  //window.location.reload();
  
  /* revalidateTag('') // Update cached posts
  redirect(`/`) // Navigate to the new post page */

  // Return the new config
  return { success: true };
}

export default async function Home() {
  return (
    <div className="content-wide flex flex-col justify-center">
      <RequestsGrid />
    </div>
  );
}
