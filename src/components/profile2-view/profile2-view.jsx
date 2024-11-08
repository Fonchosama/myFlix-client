import { useEffect, useState } from 'react';

export const Profile2View = ({ hello, user }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    console.log('Profile view loaded');
    fetch('https://pokeapi.co/api/v2/pokemon?limit=5&offset=3').then((res) =>
      setProfile({
        profilePicUrl: 'https://myprofilepic',
      })
    );
  }, []);

  return (
    <div>
      <h2>Username: {user.Username}</h2>
      <h3>Email: {user.Email}</h3>
      <hr />
      <h3>Profile Info</h3>
      <h4>Profile Pic: {profile.profilePicUrl}</h4>
    </div>
  );
};
