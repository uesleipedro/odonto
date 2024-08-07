CREATE SCHEMA empresa_1;
DO $$
DECLARE
    tbl TEXT;
BEGIN
    FOR tbl IN
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'odonto'
    LOOP
        EXECUTE format('CREATE TABLE new_schema_name.%I (LIKE existing_schema_name.%I INCLUDING ALL)', tbl, tbl);
    END LOOP;
END $$;
