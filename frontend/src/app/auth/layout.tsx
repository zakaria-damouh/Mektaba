import AuthHeader from "@/components/authComponents/elements/AuthHeader";


function AuthLayout({children }: Readonly<{children: React.ReactNode}>) {
    return (
        <>
            <header className="container max-w-6xl mx-auto border-b">
                <AuthHeader />
            </header>
            <div className="container max-w-6xl mx-auto mt-10 p-6">
                {children}
            </div>
        </>
    );
}

export default AuthLayout;