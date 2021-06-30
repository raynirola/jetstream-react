import React from 'react';
import AuthenticationCardLogo from "@/Jetstream/AuthenticationCardLogo";

function TermsOfService({terms}) {
    return (
        <div className="font-sans text-gray-900 antialiased">
            <div className="bg-gray-100 min-h-screen py-8">
                <div className="flex flex-col items-center pt-6 sm:pt-0">
                    <div>
                        <AuthenticationCardLogo/>
                    </div>

                    <div dangerouslySetInnerHTML={{__html: terms}}
                         className="w-full sm:max-w-2xl mt-6 p-6 bg-white shadow-md overflow-hidden sm:rounded-lg prose">
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TermsOfService;
