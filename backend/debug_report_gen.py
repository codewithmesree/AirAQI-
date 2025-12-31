import sys
import traceback
# Add current directory to path to find usage modules
sys.path.append('.')

try:
    from report_generator import generate_report
    print("Attempting to generate PDF...")
    filename = generate_report("Debug Report", "PDF", "debug_user_123")
    print(f"PDF Result: {filename}")
    
    print("Attempting to generate CSV...")
    filename = generate_report("Debug Report", "CSV", "debug_user_123")
    print(f"CSV Result: {filename}")
    
    print("Attempting to generate DOCX...")
    filename = generate_report("Debug Report", "DOCX", "debug_user_123")
    print(f"DOCX Result: {filename}")
    
except Exception:
    with open('gen_error.log', 'w') as f:
        traceback.print_exc(file=f)
    traceback.print_exc()
