import NewArrivalHerosection from "@/components/update/NewArrivalHerosection";
import NewProductsgrid from "@/components/update/NewProductsgrid";
import NewsletterSection from "@/components/update/Newslettersection";
import PromoSection from "@/components/update/Promosection";

export default function Page(){
    return(
        <div>
            <NewArrivalHerosection/>
            <NewProductsgrid/>
            <PromoSection/>
            <NewsletterSection/>
        </div>
    )
}