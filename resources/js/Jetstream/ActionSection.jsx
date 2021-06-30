import React from 'react';
import SectionTitle from "@/Jetstream/SectionTitle";

const ActionSection = ({title, description, children, className}) => {
    return (
        <div className={`md:grid md:grid-cols-3 md:gap-6 ${className}`}>
            <SectionTitle title={title} description={description}/>

            <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="px-4 py-5 sm:p-6 bg-white shadow sm:rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ActionSection;
