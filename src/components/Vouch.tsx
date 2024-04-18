import Image from "next/image";
import Link from "next/link";
import { ipfs } from "utils/ipfs";
import Identicon from "./Identicon";

interface VouchingTooltipProps {
    isActive: boolean | undefined;
    reason: string | undefined;
    name: string | null | undefined;
    photo: string | undefined;
    key: number;
    href: string;
    pohId: any;
    address: `0x${string}` | undefined;
}

const Vouch: React.FC<VouchingTooltipProps> = ({isActive, reason, name, photo, key, href, pohId, address}) => {
    const className = `w-8 h-8 rounded-full cursor-pointer ${!isActive? 'opacity-25' : ''}`;
    return (
        <Link key={key} href={pohId && href}>
        <div className="group flex relative">
            {photo?
                <Image
                    className={className}
                    alt="image"
                    src={ipfs(photo)}
                    width={64}
                    height={64}
                /> 
            : 
                <Identicon key={key} address={address} diameter={32} />
            }
            <div className="\
                group-hover:visible invisible \
                group-hover:translate-y-6 ease-in-out transition transform absolute \
                content-between place-content-center w-[219px] h-[72px] flex-shrink-0 rounded-[3px] border-[1px] border-[solid] \
                bg-[var(--Light-Mode-White-background,_#FFF)] [box-shadow:0px_2px_3px_0px_rgba(0,_0,_0,_0.06)] text-center text-[14px] \
                left-1/2 -translate-x-1/2 translate-y-full m-4 mx-auto \
                not-italic font-normal leading-[normal] outline-black outline-color: #E5E5E5\
            ">
                
                <span>
                    {isActive? 'Vouch confirmed' : 'Vouch in queue'}
                </span>
                
                <br/>
                
                {!!reason?
                <>
                    <span className="italic">
                        ({reason})
                    </span>
                    
                    <br/>
                </>
                : null}

                <span className="text-base font-bold">
                    {name}
                </span>
            </div>
        </div>
        </Link>
    )
};

export default Vouch;
