﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(Context))]
    [Migration("20221023174642_PasswordNotRequired1")]
    partial class PasswordNotRequired1
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("backend.Models.Company", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<bool>("Confirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("Deleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("ID");

                    b.ToTable("Company");
                });

            modelBuilder.Entity("backend.Models.Review", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("AuthorID")
                        .HasColumnType("int");

                    b.Property<bool>("Deleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Message")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("PublishDate")
                        .HasColumnType("datetime(6)");

                    b.Property<double>("Rating")
                        .HasColumnType("double");

                    b.Property<int>("ServiceID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("AuthorID");

                    b.HasIndex("ServiceID");

                    b.ToTable("Review");
                });

            modelBuilder.Entity("backend.Models.Service", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("CompanyID")
                        .HasColumnType("int");

                    b.Property<bool>("Confirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("Deleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("ID");

                    b.HasIndex("CompanyID");

                    b.ToTable("Service");
                });

            modelBuilder.Entity("backend.Models.User", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("Birtday")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("CompanyID")
                        .HasColumnType("int");

                    b.Property<bool>("Deleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("EmailAddress")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("Gender")
                        .HasColumnType("int");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Roles")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("ID");

                    b.HasIndex("CompanyID");

                    b.ToTable("User");
                });

            modelBuilder.Entity("backend.Models.Review", b =>
                {
                    b.HasOne("backend.Models.User", "Author")
                        .WithMany()
                        .HasForeignKey("AuthorID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.Service", "Service")
                        .WithMany()
                        .HasForeignKey("ServiceID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Author");

                    b.Navigation("Service");
                });

            modelBuilder.Entity("backend.Models.Service", b =>
                {
                    b.HasOne("backend.Models.Company", "Company")
                        .WithMany()
                        .HasForeignKey("CompanyID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");
                });

            modelBuilder.Entity("backend.Models.User", b =>
                {
                    b.HasOne("backend.Models.Company", "Company")
                        .WithMany("Employees")
                        .HasForeignKey("CompanyID");

                    b.Navigation("Company");
                });

            modelBuilder.Entity("backend.Models.Company", b =>
                {
                    b.Navigation("Employees");
                });
#pragma warning restore 612, 618
        }
    }
}
