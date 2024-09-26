from PyQt5.QtWidgets import QApplication, QMainWindow, QLabel, QWidget, QVBoxLayout, QHBoxLayout, QGridLayout, QPushButton
from PyQt5.QtGui import QFont, QIcon 
from PyQt5.QtCore import Qt, pyqtSlot

class MainWindow( QMainWindow ):
    def __init__(self):
        super().__init__()
        self.setGeometry(100, 100, 840, 480)
        self.setWindowTitle("Attainment AI")
        self.setWindowIcon(QIcon("appicon.png"))
        self.initUI()

    def initUI(self):
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        self.sidebar()
        label = QLabel("Attainment AI", self)
        label.setFont(QFont("Arial", 30))
        label.setGeometry(260,0, 580, 50)
        label.setStyleSheet(
            "color:#FFFFa0;"
            "background-color:blue;"
            "font-weight: bold;")
        label.setAlignment(Qt.AlignCenter)


        # label2 = QLabel("#2", self)
        # label3 = QLabel("#3", self)
        # label4 = QLabel("#4", self)
        # label5 = QLabel("#5", self)
        # label2.setStyleSheet("background-color:yellow")
        # label3.setStyleSheet("background-color:green")
        # label4.setStyleSheet("background-color:lightblue")
        # label5.setStyleSheet("background-color:pink")

        # grid = QGridLayout() 

        # grid.addWidget(label1, 0,1)
        # grid.addWidget(label2, 0,1)
        # grid.addWidget(label3, 1,0)
        # grid.addWidget(label4, 1,1)
        # grid.addWidget(label5, 0,2)

        # central_widget.setLayout(grid)

    def sidebar(self):
        sidbarBg = QLabel("", self)
        sidbarBg.setGeometry(0,0, 260, 480)
        sidbarBg.setStyleSheet(
            "background-color:grey;"
            "border-right:1px solid white")

        label1 = QPushButton("Blooms Taxonomy", self)
        label1.setFont(QFont("Arial", 20))
        label1.setStyleSheet("""
            QPushButton {
                background-color:red;
                font-weight:bold;
                color:white;
                border-top-left-radius:20px;
                border-top-right-radius:20px;
                border-bottom-left-radius:20px;
                border-bottom-right-radius:20px;
            }

            QPushButton::hover {
                background-color: lightgreen;
            }
            """)
        label1.setGeometry(10,10, 240, 40)
        label1.clicked.connect(self.on_click_bloom)
        pass
    @pyqtSlot()
    def on_click_bloom(self):
        print("cli cky")

def main():
    app = QApplication([])
    window = MainWindow()

    window.show()
    app.exec_()

if __name__ == '__main__':
    main()