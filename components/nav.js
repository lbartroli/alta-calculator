import Link from "next/link";

const Nav = () => (
    <div className="nav">
        <Link href="/">
            <a>Home</a>
        </Link>
        <Link href="/examples">
            <a>Examples</a>
        </Link>
        <style jsx>{`
            a {
                margin-right: 15px;
            }
        `}</style>
    </div>
);
export default Nav;
