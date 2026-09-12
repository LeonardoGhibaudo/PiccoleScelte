import os
import re

images = [
    'bg_classroom.jpg', 'bg_bedroom.jpg', 'park.jpg', 'bg_classroom_1783428304980.jpg',
    'bg_bus.jpg', 'bg_bus_1783443270202.jpg', 'home.jpg', 'bg_hallway.jpg',
    'bg_supermarket_1783443248380.jpg', 'bg_friends_1783428315424.jpg', 'bg_street.jpg',
    'bg_park.jpg', 'supermarket.jpg', 'main_menu.jpg', 'bg_kitchen.jpg', 'bus.jpg',
    'classroom.jpg', 'bg_home_1783428349922.jpg',
    'teacher.jpg', 'char_parent.jpg', 'char_stranger.jpg', 'stranger.jpg',
    'friend.jpg', 'char_teacher.jpg', 'bully.jpg', 'student.jpg',
    'char_bully.jpg', 'char_friend.jpg', 'hero.png', 'vite.svg', 'react.svg'
]

used_images = set()

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith(('.ts', '.tsx', '.css')):
            with open(os.path.join(root, file), 'r') as f:
                content = f.read()
                for img in images:
                    if img in content:
                        used_images.add(img)

# Also check server/src/data/chapters.json or any json data
for root, _, files in os.walk('server/src/data'):
    for file in files:
        if file.endswith('.json'):
            with open(os.path.join(root, file), 'r') as f:
                content = f.read()
                for img in images:
                    if img in content:
                        used_images.add(img)

unused = set(images) - used_images
print("Unused images:")
for img in unused:
    print(img)
