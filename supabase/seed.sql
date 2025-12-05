-- Sample data insertion for users
INSERT INTO
    auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        recovery_sent_at,
        last_sign_in_at,
        raw_app_meta_data,
        raw_user_meta_data,
        created_at,
        updated_at,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token
    ) (
        select
            '00000000-0000-0000-0000-000000000000',
            uuid_generate_v4 (),
            'authenticated',
            'authenticated',
            'user' || (ROW_NUMBER() OVER ()) || '@example.com',
            crypt ('testtest', gen_salt ('bf')),
            current_timestamp,
            current_timestamp,
            current_timestamp,
            '{"provider":"email","providers":["email"]}',
            '{}',
            current_timestamp,
            current_timestamp,
            '',
            '',
            '',
            ''
        FROM
            generate_series(1, 10)
    );

-- Sample data insertion for organizers
INSERT INTO organizers (id, name, contact_info) VALUES 
(uuid_generate_v4(), 'Community Center', 'contact@communitycenter.org'),
(uuid_generate_v4(), 'Local Library', 'info@locallibrary.org'),
(uuid_generate_v4(), 'Sports Club', 'contact@sportsclub.org'),
(uuid_generate_v4(), 'Music Hall', 'info@musichall.org'),
(uuid_generate_v4(), 'Art Gallery', 'contact@artgallery.org');

-- Sample data insertion for events
INSERT INTO events (id, name, date, location, description, time, venue, organizer_id) VALUES 
(uuid_generate_v4(), 'Community Potluck', NOW(), 'Central Park', 'Bring your favorite dish to share with your neighbors.', '12:00:00', 'Central Park Pavilion', (SELECT id FROM organizers WHERE name = 'Community Center')),
(uuid_generate_v4(), 'Book Club Meeting', NOW() - INTERVAL '1 day', 'Local Library', 'Discussing this month''s book: "The Great Gatsby".', '14:00:00', 'Library Conference Room', (SELECT id FROM organizers WHERE name = 'Local Library')),
(uuid_generate_v4(), 'Charity Run', NOW() + INTERVAL '1 month', 'City Park', 'Join us for a 5k run to raise money for local charities.', '09:00:00', 'City Park', (SELECT id FROM organizers WHERE name = 'Sports Club')),
(uuid_generate_v4(), 'Jazz Night', NOW() - INTERVAL '1 week', 'Downtown Music Hall', 'Enjoy an evening of live jazz music.', '19:00:00', 'Downtown Music Hall', (SELECT id FROM organizers WHERE name = 'Music Hall')),
(uuid_generate_v4(), 'Art Exhibition', NOW() - INTERVAL '2 weeks', 'Modern Art Gallery', 'Explore the latest works from contemporary artists.', '17:00:00', 'Modern Art Gallery', (SELECT id FROM organizers WHERE name = 'Art Gallery')),
(uuid_generate_v4(), 'Yoga Workshop', NOW() + INTERVAL '9 days', 'Wellness Center', 'A full-day workshop to enhance your yoga practice.', '08:00:00', 'Wellness Center', (SELECT id FROM organizers WHERE name = 'Community Center')),
(uuid_generate_v4(), 'Cooking Class', NOW() - INTERVAL '17 days', 'Culinary Institute', 'Learn to cook gourmet meals with our expert chefs.', '11:00:00', 'Culinary Institute', (SELECT id FROM organizers WHERE name = 'Community Center')),
(uuid_generate_v4(), 'Tech Conference', NOW() - INTERVAL '25 days', 'Convention Center', 'Join industry leaders to discuss the latest in technology.', '10:00:00', 'Convention Center', (SELECT id FROM organizers WHERE name = 'Community Center')),
(uuid_generate_v4(), 'Outdoor Concert', NOW() - INTERVAL '2 months', 'Amphitheater', 'An evening of music under the stars.', '18:00:00', 'Amphitheater', (SELECT id FROM organizers WHERE name = 'Music Hall')),
(uuid_generate_v4(), 'Photography Workshop', NOW() + INTERVAL '2 weeks', 'Art Institute', 'Improve your photography skills with hands-on training.', '09:00:00', 'Art Institute', (SELECT id FROM organizers WHERE name = 'Art Gallery'));