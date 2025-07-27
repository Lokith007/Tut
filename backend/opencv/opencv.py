from flask import Flask, render_template, Response, jsonify
from ultralytics import YOLO
import cv2
import threading
import time

app = Flask(__name__)

# Load YOLO model
model = YOLO("best.pt")

camera = None
streaming = False
lock = threading.Lock()

# Tracking variables
last_label = None
label_start_time = None
final_status = ""

def generate_frames():
    global camera, streaming, last_label, label_start_time, final_status

    while streaming:
        success, frame = camera.read()
        if not success:
            break

        # Predict
        results = model(frame)
        label = results[0].names[results[0].probs.top1]

        # --- Tracking duration logic ---
        current_time = time.time()
        if label == last_label:
            elapsed = current_time - label_start_time
            if label == "bad" and elapsed >= 2:
                final_status = "Bad Product Package"
            elif label == "good" and elapsed >= 10:
                final_status = "Good Product Package"
        else:
            last_label = label
            label_start_time = current_time
            final_status = ""  # reset when label changes

        # Display text
        display_text = final_status if final_status else f"Prediction: {label}"
        cv2.putText(frame, display_text,
                    (30, 50), cv2.FONT_HERSHEY_SIMPLEX,
                    1, (0, 255, 0), 2)

        # Convert frame to JPEG
        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/start', methods=['POST'])
def start_stream():
    global camera, streaming
    with lock:
        if not streaming:
            camera = cv2.VideoCapture(0)
            streaming = True
    return jsonify({"status": "started"})

@app.route('/stop', methods=['POST'])
def stop_stream():
    global camera, streaming
    with lock:
        streaming = False
        if camera is not None:
            camera.release()
            camera = None
    return jsonify({"status": "stopped"})

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(debug=True)
