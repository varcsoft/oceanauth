DO $$ 
DECLARE
    i INT;
    token TEXT;
    dynamic_image TEXT;
BEGIN
    dynamic_image := '  ';
    token := '{{token}}';

    -- Truncate all tables
    TRUNCATE TABLE role, users, login_history RESTART IDENTITY CASCADE;

    -- Insert data into the 'role' table
    INSERT INTO role (name, created_on, modified_on)
    VALUES
        ('ADMIN', current_timestamp, current_timestamp),
        ('USER', current_timestamp, current_timestamp);

    -- Insert data into the 'user' table
    FOR i IN 1..200 LOOP
    INSERT INTO users (email, password, status, name, address, profile_pic, token, role_id, created_on, modified_on)
    VALUES
        ('shivakokkula' || i || '@gmail.com', '{{password}}', true, 'User' || i, 'Address ' || i, dynamic_image, 'token' || i, floor(random() * 2) + 1, current_timestamp, current_timestamp);
    END LOOP;

    -- Insert data into the 'login_history' table
    FOR i IN 1..200 LOOP
    INSERT INTO login_history (user_id, ipaddress, useragent, devicetype, operatingsystem, browser, timestamp)
    VALUES
        (i, '192.168.0.' || i, 'UserAgent' || i, 'DeviceType' || i, 'OS' || i, 'Browser' || i, current_timestamp);
    END LOOP;
END $$;