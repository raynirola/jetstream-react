import {useState} from "react";
import {Inertia} from "@inertiajs/inertia";
import {InertiaLink, usePage} from "@inertiajs/inertia-react";

import NavLink from "@/Jetstream/NavLink";
import Dropdown from "@/Jetstream/Dropdown";
import DropdownLink from "@/Jetstream/DropdownLink";
import ApplicationMark from "@/Jetstream/ApplicationMark";
import ResponsiveNavLink from "@/Jetstream/ResponsiveNavLink";
import {CheckCircleIcon, SelectorIcon} from "@heroicons/react/outline";


const AppLayout = (props) => {
    const {user: authUser} = usePage().props

    const {canCreateTeams, managesProfilePhotos, hasApiFeatures, hasTeamFeatures} = usePage().props.jetstream

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState()

    const logout = () => Inertia.post(route('logout'), null);

    const switchToTeam = (event, team) => {
        event.preventDefault()
        Inertia.put(route('current-team.update'), {
            'team_id': team.id
        },{preserveState: false})
    }

    return (
        <div>
            {/*<Banner/>*/}
            <div className="min-h-screen bg-gray-100">
                <nav className="bg-white border-b border-gray-100">
                    {/*<!-- Primary Navigation Menu -->*/}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                {/* <!-- Logo -->*/}
                                <div className="flex-shrink-0 flex items-center">
                                    <InertiaLink href={route('dashboard')}>
                                        <ApplicationMark className="block h-9 w-auto"/>
                                    </InertiaLink>
                                </div>

                                {/*<!-- Navigation Links -->*/}
                                <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                    <NavLink active={route().current('dashboard')} href={route('dashboard')}>
                                        Dashboard
                                    </NavLink>
                                </div>
                            </div>

                            <div className="hidden sm:flex sm:items-center sm:ml-6">
                                {
                                    hasTeamFeatures &&
                                    <div className="ml-3 relative">
                                        {/*// <!-- Teams Dropdown -->*/}
                                        <Dropdown
                                            align="right" open={false} width="w-64"
                                            trigger={
                                                <div className="inline-flex rounded-md">
                                                    <button type="button"
                                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition">
                                                        {authUser.current_team.name}
                                                        <SelectorIcon className="ml-2 -mr-0.5 h-4 w-4"/>
                                                    </button>
                                                </div>
                                            }
                                        >
                                            <div className="w-60">
                                                {/*// <!-- Team Management -->*/}
                                                <div className="block px-4 py-2 text-xs text-gray-400">
                                                    Manage Team
                                                </div>

                                                {/*// <!-- Team Settings -->*/}
                                                <DropdownLink href={route('teams.show', authUser.current_team)}>
                                                    Team Settings
                                                </DropdownLink>

                                                {canCreateTeams &&
                                                <DropdownLink
                                                    href={route('teams.create')}>
                                                    Create New Team
                                                </DropdownLink>
                                                }

                                                <div className="border-t border-gray-100 my-1"/>

                                                {/*// <!-- Team Switcher -->*/}
                                                <div className="block px-4 py-2 text-xs text-gray-400">
                                                    Switch Teams
                                                </div>

                                                {Object.values(authUser.all_teams).map(team =>
                                                    <form key={team.id} onSubmit={event => switchToTeam(event, team)}>
                                                        <DropdownLink as="button">
                                                            <div className="flex items-center">
                                                                <div>{team.name}</div>
                                                                {team.id === authUser.current_team_id &&
                                                                <CheckCircleIcon className="ml-2 h-5 w-5 text-green-400"/>
                                                                }
                                                            </div>
                                                        </DropdownLink>
                                                    </form>)
                                                }
                                            </div>
                                        </Dropdown>
                                    </div>
                                }

                                {/*// <!-- Settings Dropdown -->*/}
                                <div className="ml-3 relative">
                                    <Dropdown className="w-48" align="right" trigger={
                                        <>
                                            {managesProfilePhotos ?
                                                <button
                                                    className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition">
                                                    <img
                                                        className="h-8 w-8 rounded-full object-cover"
                                                        src={authUser.profile_photo_url} alt={authUser.name}/>
                                                </button>
                                                :
                                                <div className="inline-flex rounded-md">
                                                    <button type="button"
                                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition">
                                                        {authUser.name}

                                                        <svg className="ml-2 -mr-0.5 h-4 w-4"
                                                             xmlns="http://www.w3.org/2000/svg"
                                                             viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd"
                                                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                  clipRule="evenodd"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            }
                                        </>
                                    }>
                                        {/*// <!-- Account Management -->*/}
                                        <div className="block px-4 py-2 text-xs text-gray-400">
                                            Manage Account
                                        </div>

                                        <DropdownLink href={route('profile.show')}>
                                            Profile
                                        </DropdownLink>

                                        {hasApiFeatures &&
                                        <DropdownLink href={route('api-tokens.index')}>
                                            API Tokens
                                        </DropdownLink>
                                        }

                                        <div className="border-t border-gray-100 my-1"/>

                                        {/*// <!-- Authentication -->*/}
                                        <form onSubmit={event => {
                                            event.preventDefault();
                                            logout()
                                        }}>
                                            <DropdownLink as="button" className="text-left">
                                                Log Out
                                            </DropdownLink>
                                        </form>
                                    </Dropdown>
                                </div>
                            </div>

                            {/*// <!-- Hamburger -->*/}
                            <div className="-mr-2 flex items-center sm:hidden">
                                <button
                                    onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition">
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path className={`${showingNavigationDropdown ? 'hidden' : 'inline-flex'}`}
                                              strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M4 6h16M4 12h16M4 18h16"/>
                                        <path className={`${showingNavigationDropdown ? 'inline-flex' : 'hidden'}`}
                                              strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/*// <!-- Responsive Navigation Menu -->*/}
                    <div className={`sm:hidden ${showingNavigationDropdown ? 'block' : 'hidden'}`}>
                        <div className="pt-2 pb-3 space-y-1">
                            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                Dashboard
                            </ResponsiveNavLink>
                        </div>

                        {/*// <!-- Responsive Settings Options -->*/}
                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="flex items-center px-4">
                                {managesProfilePhotos &&
                                <div className="flex-shrink-0 mr-3">
                                    <img className="h-10 w-10 rounded-full object-cover"
                                         src={authUser.profile_photo_url}
                                         alt={authUser.name}/>
                                </div>
                                }

                                <div>
                                    <div className="font-medium text-base text-gray-800">{authUser.name}</div>
                                    <div className="font-medium text-sm text-gray-500">{authUser.email}</div>
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink
                                    href={route('profile.show')}
                                    active={route().current('profile.show')}>
                                    Profile
                                </ResponsiveNavLink>

                                {hasApiFeatures &&
                                <ResponsiveNavLink
                                    href={route('api-tokens.index')}
                                    active={route().current('api-tokens.index')}>
                                    API Tokens
                                </ResponsiveNavLink>
                                }

                                {/*// <!-- Authentication -->*/}
                                <form method="POST"
                                      onSubmit={() => console.log('logout mobile')}>
                                    <ResponsiveNavLink as="button">
                                        Log Out
                                    </ResponsiveNavLink>
                                </form>

                                {/*// <!-- Team Management -->*/}
                                {hasTeamFeatures &&
                                <>
                                    <div className="border-t border-gray-200"/>

                                    <div className="block px-4 py-2 text-xs text-gray-400">
                                        Manage Team
                                    </div>

                                    {/*// <!-- Team Settings -->*/}
                                    <ResponsiveNavLink
                                        href={route('teams.show', authUser.current_team)}
                                        active={route().current('teams.show')}>
                                        Team Settings
                                    </ResponsiveNavLink>

                                    <ResponsiveNavLink
                                        href={route('teams.create')} active={route().current('teams.create')}>
                                        Create New Team
                                    </ResponsiveNavLink>

                                    <div className="border-t border-gray-200"/>

                                    {/*// <!-- Team Switcher -->*/}
                                    <div className="block px-4 py-2 text-xs text-gray-400">
                                        Switch Teams
                                    </div>
                                    {Object.values(authUser.all_teams).map(team =>
                                        <form key={team.id}
                                              onSubmit={() => console.log('switchTeams')}>
                                            <ResponsiveNavLink as="button">
                                                <div className="flex items-center">
                                                    {team.id === authUser.current_team_id &&
                                                    <svg className="mr-2 h-5 w-5 text-green-400"
                                                         fill="none"
                                                         strokeLinecap="round" strokeLinejoin="round"
                                                         strokeWidth="2"
                                                         stroke="currentColor"
                                                         viewBox="0 0 24 24">
                                                        <path
                                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                    </svg>
                                                    }
                                                    <div>{team.name}</div>
                                                </div>
                                            </ResponsiveNavLink>
                                        </form>
                                    )}

                                </>
                                }
                            </div>
                        </div>
                    </div>
                </nav>

                {/*// <!-- Page Heading -->*/}
                {props.header &&
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {props.header}
                    </div>
                </header>
                }

                {/*// <!-- Page Content -->*/}
                <main>
                    {props.children}
                </main>
            </div>
        </div>
    )
}

export default AppLayout
