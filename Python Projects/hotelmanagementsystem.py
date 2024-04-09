from datetime import date

class Hotel:

    def __init__(self):

        self.rooms={}
        
        self.available_rooms={'Standard':{101,102,103,104,105},'Delux':{201,202,203,204,205},'Executive':{301,302,303,304,305},'Suite':{401,402,403,404,405}}
        
        self.roomprice={1:1500,2:4000,3:5000,4:6000}

    def check_in(self,name,address,phone):
        
        print()
        roomtype=int(input('Room types:\n1.Standard \n2.Delux \n3.Executive \n4.Suite \nSelect a room type :'))
        
        if roomtype == 1:
            
            if self.available_rooms['Standard']:
           
                room_no = self.available_rooms['Standard'].pop()
           
            else:
           
                print("Sorry,Standard rooms not available")
                return
            
        elif roomtype == 2:
            
            if self.available_rooms['Delux']:
           
                room_no = self.available_rooms['Delux'].pop()
           
            else:
           
                print("Sorry,Delux rooms not available")
                return
            
        elif roomtype == 3:
            
            if self.available_rooms['Executive']:
           
                room_no = self.available_rooms['Executive'].pop()
           
            else:
           
                print("Sorry,Executive rooms not available")
                return
            
        elif roomtype == 4:
            
            if self.available_rooms['Suite']:
           
                room_no = self.available_rooms['Suite'].pop()
           
            else:
           
                print("Sorry,Suite rooms not available")
                return
            
        else:
           
            print("Choose a valid room type")
        
        d,m,y = map(int,input("Enter check-in-date in date,month,year :").split())
        check_in_date = date(y,m,d)
        
        self.rooms[room_no] = {
            'name':name,
            'address':address,
            'phone':phone,
            'check_in_date':check_in_date,
            'room_type':roomtype,
            'roomservice':0
        }
        
        print(f"Checked in {name},{address} to room: {room_no} on {check_in_date}")
        print(self.rooms)

    def room_service(self,room_no):
        
        if room_no in self.rooms:

            print("----------> Restaurant Menu <----------")
            print("1.Tea/Coffee Hot: 20Rs \n2.Fixed-Breakfast: 120Rs \n3.Fixed-Lunch: 170Rs \n4.Fixed-Dinner: 200Rs \n5. Dessert: 100Rs \n6.Exit")
            
            while True:
                c = int(input("Select your choice:"))
                if c == 1:
           
                    quantity = int(input("Enter the quantity:"))
                    self.rooms[room_no]['roomservice']+=20*quantity

                elif c == 2:
           
                    quantity = int(input("Enter the quantity:"))
                    self.rooms[room_no]['roomservice']+=120*quantity

                elif c == 3:
           
                    quantity = int(input("Enter the quantity:"))
                    self.rooms[room_no]['roomservice']+=170*quantity

                elif c == 4:
           
                    quantity = int(input("Enter the quantity:"))
                    self.rooms[room_no]['roomservice']+=200*quantity

                elif c == 5:
           
                    quantity = int(input("Enter the quantity:"))
                    self.rooms[room_no]['roomservice']+=100*quantity

                elif c == 6:
           
                    break

                else:
           
                    print("Invalid choice")
            print("Room service Rs:",self.rooms[room_no]['roomservice'],'\n')
        
        else:
           
            print("Invalid room number")

    def display_occupied(self):
        
        if not self.rooms:
           
            print("No rooms are occupied right now.")
        
        else:
           
            print("Occupied Rooms: ")
            print("--------------------------------")
            print("Room no.   Name   Phone-number")
            print("--------------------------------")
            for room_number,details in self.rooms.items():
                print(room_number,'\t',details['name'],'\t',details['phone'])

    def check_out(self, room_number):
        
        if room_number in self.rooms:
           
            d1,m1,y1 = map(int,input("Enter check-out-date in date,month,year :").split())
            check_out_date = date(y1,m1,d1)
            check_in_date = self.rooms[room_number]['check_in_date']
            duration = (check_out_date - check_in_date).days
            
            if duration > 0:
           
                roomtype = self.rooms[room_number]['room_type']

                if roomtype == 1:
           
                    self.available_rooms['Standard'].add(room_number)
            
                elif roomtype == 2:
           
                    self.available_rooms['Delux'].add(room_number)
            
                elif roomtype == 3:
           
                    self.available_rooms['Executive'].add(room_number)
            
                elif roomtype == 4:
           
                    self.available_rooms['Suite'].add(room_number)

                room_bill = self.roomprice[roomtype] * duration
                room_service = self.rooms[room_number]['roomservice']
                non_gst_bill = room_bill + room_service
                gst_bill=non_gst_bill*0.18+non_gst_bill

                print(f"Name: {self.rooms[room_number]['name']}")
                print(f"Address: {self.rooms[room_number]['address']}")
                print(f"Phone number: {self.rooms[room_number]['phone']}")
                print(f"Room Number: {room_number}")
                print(f"Check in date: {check_in_date.strftime('%d %B %y')}")
                print(f"Check out date: {check_out_date.strftime('%d %B %y')}")
                print(f"No of days: {duration}\tPrice per day: Rs.{self.roomprice[roomtype]}")
                print(f"Room bill: Rs. {room_bill}")
                print(f"Room Service: Rs. {room_service}")
                print(f"Before applying gst: Rs. {non_gst_bill}")
                print(f"Total bill after gst: Rs. {gst_bill}")
                while True:
                    print("--------------Mode of payment----------------")
                    print("1. UPI")
                    print("2.Credit Card")
                    pay_choice=input("Enter your payment option:")
                    
                    if pay_choice == '1':
                        print("UPI mode")
                        print("UPI ID 2345adsf7643d")
                        del self.rooms[room_number]
                        break


                    elif pay_choice =='2':
                        print("Credit card")
                        print("Enter your card no:")
                        card_no=int(input())
                        print("Enter pin")
                        pin=int(input())
                        del self.rooms[room_number]
                        break


                    else:
                        print("Invalid choice please try again")
            
            else:
                
                print("Sorry! Checkout not possible")
                print("Try again enter proper date")
        
        else:
            
            print(f"Room {room_number} is not occupied.")

    def welcome(self):
        
        while True:
            
            print("-------------------------------------------")
            print("Welcome to the Royal Hotel")
            print("1. Check-In")
            print("2. Room Service")
            print("3. Display Occupied Rooms")
            print("4. Check-Out")
            print("5. Exit")
            choice = input("Enter your choice (1-5): ")
        
            if choice == '1':
            
                name = input("Enter Client name :")
                address = input("Enter address :")
                phone_no = input("Enter contact no :")
                if len(phone_no)==10 and phone_no.isdigit():
            
                    print("Valid phone number")
                    self.check_in(name,address,phone_no)
                else:
            
                    print("Invalid phone number")
                
            elif choice == '2':
            
                room_number=int(input("Enter room number :"))
                self.room_service(room_number)
        
            elif choice == '3':
            
                self.display_occupied()
        
            elif choice == '4':
            
                room_number_check_out=int(input("Enter room number :"))
                self.check_out(room_number_check_out)
        
            elif choice == '5':
            
                break
        
            else:
            
                print("Invalid choice please try again")

h=Hotel()
h.welcome()            