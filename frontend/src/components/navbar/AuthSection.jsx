'use client';
import { useEffect, useState } from 'react';
import { ModeToggle } from '@/components/navbar/Toggle';
import { NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import ProfileDropdown from '@/components/navbar/NavDropdown';
import AuthTabs from '@/components/navbar/AuthTabs';
import { checkUser, fetchProfile } from '@/lib/actions';

export function AuthSection() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userId = await checkUser();
        if (userId) {
          setIsAuthenticated(true);
          const data = await fetchProfile();
          console.log(data);
          setProfile(data);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    checkAuth();
  }, []); // Run only once after the initial render

  return (
    <NavigationMenuList>
      <NavigationMenuItem>
        <ModeToggle />
      </NavigationMenuItem>
      <NavigationMenuItem>
        {!isAuthenticated ? (
          <AuthTabs setIsAuthenticated={setIsAuthenticated} />
        ) : (
          <div className="flex justify-between items-center space-x-5">
            <ProfileDropdown profile={profile} setIsAuthenticated={setIsAuthenticated} />
          </div>
        )}
      </NavigationMenuItem>
    </NavigationMenuList>
  );
}
