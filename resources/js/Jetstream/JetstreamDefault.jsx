import ApplicationLogo from "@/Jetstream/ApplicationLogo";
import {ArrowRightIcon, BookOpenIcon, CameraIcon, PhotographIcon} from "@/Icons";

const JetstreamDefault = () => {
    return (
        <div>
            <div className="p-6 sm:px-20 bg-white border-b border-gray-200">
                <div>
                    <ApplicationLogo className="block h-10 w-auto"/>
                </div>

                <div className="mt-8 text-xl">
                    Welcome to your Jetstream application!
                </div>

                <div className="mt-4 text-gray-500">
                    Laravel Jetstream provides a beautiful, robust starting point for your next Laravel application.
                    Laravel is designed to help you build your application using a development environment that is
                    simple, powerful, and enjoyable. We believe you should love expressing your creativity through
                    programming, so we have spent time carefully crafting the Laravel ecosystem to be a breath of fresh
                    air. We hope you love it.
                </div>
            </div>

            <div className="bg-gray-200 bg-opacity-25 grid grid-cols-1 md:grid-cols-2">
                <div className="p-6">
                    <div className="flex items-center">
                        <BookOpenIcon className="w-8 h-8 text-gray-400"/>
                        <div className="ml-4 text-gray-600 leading-7 font-semibold"><a
                            href="https://laravel.com/docs">Documentation</a></div>
                    </div>

                    <div className="ml-12">
                        <div className="mt-2 text-sm text-gray-500">
                            Laravel has wonderful documentation covering every aspect of the framework. Whether you're
                            new to the framework or have previous experience, we recommend reading all of the
                            documentation from beginning to end.
                        </div>

                        <a href="https://laravel.com/docs">
                            <div className="mt-3 flex items-center text-sm font-semibold text-indigo-700">
                                <div>Explore the documentation</div>

                                <div className="ml-1 text-indigo-500">
                                    <ArrowRightIcon className="w-4 h-4"/>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-200 md:border-t-0 md:border-l">
                    <div className="flex items-center">
                        <CameraIcon className="w-8 h-8 text-gray-400"/>
                        <div className="ml-4 text-gray-600 leading-7 font-semibold"><a
                            href="https://laracasts.com">Laracasts</a></div>
                    </div>

                    <div className="ml-12">
                        <div className="mt-2 text-sm text-gray-500">
                            Laracasts offers thousands of video tutorials on Laravel, PHP, and JavaScript development.
                            Check them out, see for yourself, and massively level up your development skills in the
                            process.
                        </div>

                        <a href="https://laracasts.com">
                            <div className="mt-3 flex items-center text-sm font-semibold text-indigo-700">
                                <div>Start watching Laracasts</div>

                                <div className="ml-1 text-indigo-500">
                                    <ArrowRightIcon className="w-4 h-4"/>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-200">
                    <div className="flex items-center">
                        <PhotographIcon className="w-8 h-8 text-gray-400"/>
                        <div className="ml-4 text-gray-600 leading-7 font-semibold"><a
                            href="https://tailwindcss.com/">Tailwind</a></div>
                    </div>

                    <div className="ml-12">
                        <div className="mt-2 text-sm text-gray-500">
                            Laravel Jetstream is built with Tailwind, an amazing utility first CSS framework that
                            doesn't get in your way. You'll be amazed how easily you can build and maintain fresh,
                            modern designs with this wonderful framework at your fingertips.
                        </div>
                        <a href="https://tailwindcss.com/docs">
                            <div className="mt-3 flex items-center text-sm font-semibold text-indigo-700">
                                <div>Learn more about Tailwindcss</div>

                                <div className="ml-1 text-indigo-500">
                                    <ArrowRightIcon className="w-4 h-4"/>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-200 md:border-l">
                    <div className="flex items-center">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                             strokeWidth="2" viewBox="0 0 24 24" className="w-8 h-8 text-gray-400">
                            <path
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                        </svg>
                        <div className="ml-4 text-gray-600 leading-7 font-semibold">Authentication</div>
                    </div>

                    <div className="ml-12">
                        <div className="mt-2 text-sm text-gray-500">
                            Authentication and registration views are included with Laravel Jetstream, as well as
                            support for user email verification and resetting forgotten passwords. So, you're free to
                            get started what matters most: building your application.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JetstreamDefault;
