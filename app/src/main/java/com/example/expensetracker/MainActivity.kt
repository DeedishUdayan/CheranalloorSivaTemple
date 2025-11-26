package com.example.expensetracker

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.expensetracker.ui.theme.ExpenseTrackerTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ExpenseTrackerTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    ExpenseTrackerApp()
                }
            }
        }
    }
}

@Composable
fun ExpenseTrackerApp() {
    var expenseAmount by remember { mutableStateOf("") }
    var totalBalance by remember { mutableStateOf(0.0) }
    val transactions = remember { mutableStateListOf<Double>() }

    Column(modifier = Modifier.padding(16.dp)) {
        Text(
            text = "Total Balance: $" + String.format("%.2f", totalBalance),
            style = MaterialTheme.typography.headlineMedium,
            modifier = Modifier.padding(bottom = 16.dp)
        )

        OutlinedTextField(
            value = expenseAmount,
            onValueChange = { newValue -> expenseAmount = newValue },
            label = { Text("Expense Amount") },
            keyboardOptions = androidx.compose.foundation.text.KeyboardOptions(keyboardType = androidx.compose.ui.text.input.KeyboardType.Number),
            modifier = Modifier.fillMaxWidth()
        )
        Spacer(modifier = Modifier.height(8.dp))
        Button(onClick = {
            val amount = expenseAmount.toDoubleOrNull()
            if (amount != null) {
                totalBalance -= amount
                transactions.add(-amount)
                expenseAmount = ""
            }
        }, modifier = Modifier.fillMaxWidth()) {
            Text("Add Expense")
        }

        Spacer(modifier = Modifier.height(16.dp))

        Text(
            text = "Transactions:",
            style = MaterialTheme.typography.headlineSmall,
            modifier = Modifier.padding(bottom = 8.dp)
        )

        transactions.forEach { transaction ->
            Text(text = String.format("%.2f", transaction))
        }
    }
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    ExpenseTrackerTheme {
        ExpenseTrackerApp()
    }
}
