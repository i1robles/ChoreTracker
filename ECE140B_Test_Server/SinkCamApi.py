import cv2
import urllib.request
import numpy as np
from time import sleep
from time import time
from pydrive.drive import GoogleDrive
from pydrive.auth import GoogleAuth
 
url='http://192.168.187.82/cam-lo.jpg'

#Uncomment out to show live transmission
cv2.namedWindow("live transmission", cv2.WINDOW_AUTOSIZE)
 
count=0
 
 
gauth = GoogleAuth()
gauth.LocalWebserverAuth()       
drive = GoogleDrive(gauth)
folder ="1DMSEEdSaPWYQnCZKOQ7wOE_9tRaSIJD6"#please change this value according to your folder
 

timeStart = time()
sleep(.1)
timeEnd = time()
timeDelay = 5
while True:
    img_resp=urllib.request.urlopen(url)
    imgnp=np.array(bytearray(img_resp.read()),dtype=np.uint8)
    frame=cv2.imdecode(imgnp,-1)
    
    timeEnd = time()
    #Uncomment out this to show image frame
    cv2.imshow("live transmission", frame)
 
    key=cv2.waitKey(5)
    if key==ord('k'):
    #if key==ord('k') or (timeEnd -timeStart> timeDelay):
        timeStart = timeEnd
        count+=1
        #t="./images/SinkCam"+str(count)+'.png'
        t=str(count)+'.png'

        cv2.imwrite(t,frame)
        print("image saved as: "+"SinkCam"+str(t))
        
        f= drive.CreateFile({'parents':[{'id':folder}],'title':t})
        f.SetContentFile('1.png')
        f.Upload()
        print("image uploaded as: "+t)
        
    if key==ord('q'):
        break
    else:
        continue
 
cv2.destroyAllWindows()