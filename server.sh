ssh -i "./scan_page.pem" ubuntu@ec2-15-236-190-188.eu-west-3.compute.amazonaws.com
scp -i "./shoefitr-scan/scan_page.pem" "./backend/checkpoints/depth_anything_v2_vitl.pth" ubuntu@ec2-15-236-190-188.eu-west-3.compute.amazonaws.com:/home/ubuntu/shoefitr-backend/core/calculate_size/checkpoints
