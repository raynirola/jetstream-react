import SectionTitle from "@/Jetstream/SectionTitle";

const FormSection = ({title, aside, description, onSubmit, ...props}) => {
    return (
        <div className={`md:grid md:grid-cols-3 md:gap-6 ${props.className}`}>
            <SectionTitle title={title} aside={aside} description={description}/>

            <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={onSubmit}>
                    <div
                        className={`px-4 py-5 bg-white sm:p-6 shadow ${props.actions ? 'sm:rounded-tl-md sm:rounded-tr-md' : 'sm:rounded-md'}`}>
                        <div className="grid grid-cols-6 gap-6">
                            {props.children}
                        </div>
                    </div>

                    {
                        props.actions &&
                        <div
                            className="flex items-center justify-end px-4 py-3 bg-gray-50 text-right sm:px-6 shadow sm:rounded-bl-md sm:rounded-br-md">
                            {props.actions}
                        </div>
                    }
                </form>
            </div>
        </div>
    );
};

export default FormSection;
