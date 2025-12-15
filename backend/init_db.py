
# Import the Flask app and SQLAlchemy database instance
# These are defined in app.py
from app import app
from extensions import db

# text() allows execution of raw SQL queries safely via SQLAlchemy
from sqlalchemy import text

# os is used to work with file paths in a cross-platform way
import os


def init_db():
    """
    Initializes the PostgreSQL database schema by executing
    SQL statements from schema.sql
    """

    # Flask-SQLAlchemy requires an application context
    # to access configuration and database bindings
    with app.app_context():

        # Get the absolute path of the current file (init_db.py)
        # This ensures the script works no matter where it is run from
        base_dir = os.path.dirname(os.path.abspath(__file__))

        # Construct the full path to schema.sql inside backend/
        schema_path = os.path.join(base_dir, "schema.sql")

        # Open and read the SQL schema file
        # encoding="utf-8" avoids issues with special characters
        with open(schema_path, "r", encoding="utf-8") as f:
            schema_sql = f.read()

        try:
            # Split the SQL file into individual statements
            # because db.session.execute() runs one statement at a time
            statements = schema_sql.split(';')

            # Execute each SQL statement separately
            for statement in statements:
                # Skip empty or whitespace-only statements
                if statement.strip():
                    db.session.execute(text(statement))

            # Commit all changes if every statement succeeds
            db.session.commit()

            # Success message
            print("Database schema initialized successfully.")

        except Exception as e:
            # Roll back all changes if any error occurs
            db.session.rollback()

            # Write the error details to a log file for debugging
            error_log_path = os.path.join(base_dir, "db_error.log")
            with open(error_log_path, "w") as err_f:
                err_f.write(str(e))

            # Print error message to console
            print(f"Error initializing database: {e}")


# This ensures init_db() runs only when this file
# is executed directly, not when imported
if __name__ == "__main__":
    init_db()
