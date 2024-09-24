import torch
import torch.nn as nn
import torch.optim as optim
import string
import pandas as pd
import numpy as np


'''
To run this code, type 
python -m PlanIt.RNN 
into the terminal while in the PLANIT folder
'''


# Hyperparameters
input_size = 36  # 26 letters + 10 digits
hidden_size = 128
output_size = 1  # Single value from -1 to 1
num_layers = 1
embedding_dim = 16
sequence_length = 6
learning_rate = 0.001
num_epochs = 200

def load_data(csv_file, avg_col):
    df = pd.read_csv(csv_file, usecols=[0, avg_col], header=0)
    df.columns = ['Course Code', 'Course Average']
    df['Course Code'] = df['Course Code'].astype(str).str[:6]
    col1 = df['Course Code'].tolist()
    col2 = df['Course Average'].tolist()

    return [(col1[i], col2[i]) for i in range(len(col1)) if col2[i] is not None]

def encode_course_code(code):
    '''
    Encodes input course code into a numerical indices.
    ex ABC123 -> [0, 1, 2, 1, 2, 3]
    '''
    characters = string.ascii_uppercase + string.digits
    char_to_index = {char: idx for idx, char in enumerate(characters)}
    return [char_to_index[char.upper()] for char in code]

def encode_course_avg(y):
    '''
    Encodes input course average into a difficulty rating between 0 and 1, where 1 is most difficult and 0 least difficult.
    '''
    if y == 'A+':
        return 0
    elif y == 'A':
        return 0.05
    elif y == 'A-':
        return 0.1
    elif y == 'B+':
        return 0.2
    elif y == 'B':
        return 0.3
    elif y == 'B-':
        return 0.45
    elif y == 'C+':
        return 0.6
    elif y == 'C':
        return 0.7
    elif y == 'C-':
        return 0.8
    elif y == 'D+':
        return 0.9
    elif y == 'D':
        return 0.95
    elif y == 'D-':
        return 1
    return 1

def prepare_batch(data):
    '''
    Prepares input data for training.
    '''
    inputs = []
    targets = []
    for code, y in data:
        inputs.append(encode_course_code(code))
        targets.append(encode_course_avg(y))
    return torch.tensor(inputs, dtype=torch.long), torch.tensor(targets, dtype=torch.float32)

# RNN Model Definition
class RNNModel(nn.Module):
    def __init__(self, input_size, embedding_dim, hidden_size, output_size, num_layers):
        super(RNNModel, self).__init__()
        self.embedding = nn.Embedding(input_size, embedding_dim) 
        self.rnn = nn.RNN(embedding_dim, hidden_size, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_size, output_size)
        self.sigmoid = nn.Sigmoid() # To constrain the output between 0 and 1

    def forward(self, x):
        x = self.embedding(x) 
        h_0 = torch.zeros(num_layers, x.size(0), hidden_size)  
        out, _ = self.rnn(x, h_0)
        out = self.fc(out[:, -1, :])  
        return self.sigmoid(out)  

# Import training data from CSV
training_data = load_data('data/past_avgs_UTSG.csv',2)

# Model, loss function, optimizer
model = RNNModel(input_size, embedding_dim, hidden_size, output_size, num_layers)
criterion = nn.MSELoss()
optimizer = optim.Adam(model.parameters(), lr=learning_rate)

# We train it here 
for epoch in range(num_epochs):
    model.train()
    
    inputs, targets = prepare_batch(training_data)
    # Forward pass
    outputs = model(inputs)
    loss = criterion(outputs.squeeze(), targets)
    # Back pass
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
    
    if (epoch + 1) % 10 == 0:
        print(f'Epoch [{epoch+1}/{num_epochs}], Loss: {loss.item():.4f}')

# Test the model 
# Load testing data 
testing_data = load_data('data/past_avgs_UTM.csv',3)
testing_data = [(course, encode_course_avg(avg)) for course, avg in testing_data]
testing_data.append(('ECE286', encode_course_avg('B')))
all_differences = []

for code, avg in testing_data:
    with torch.no_grad():
        test_code = code
        test_input = torch.tensor([encode_course_code(test_code)], dtype=torch.long)
        predicted_difficulty = model(test_input)
        all_differences.append(predicted_difficulty.item()-float(avg))
        print(f'Predicted difficulty for {test_code}: {predicted_difficulty.item():.4f}, Actual difficulty = {avg}. Difference = {predicted_difficulty.item()-float(avg):.4f}')

testing_error = np.sqrt(np.square(all_differences).sum())/len(all_differences)
print(f'Mean Squared error = {testing_error}')

model_path = 'PlanIt/rnn_model'
torch.save(model.state_dict(), model_path)